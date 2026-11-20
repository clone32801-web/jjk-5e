import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'graphify-out');
const graphPath = path.join(outDir, 'graph.json');

const args = process.argv.slice(2);
const command = args[0] || 'help';

function loadGraph() {
  if (!fs.existsSync(graphPath)) {
    console.error('Error: graphify-out/graph.json not found. Run "node scripts/graphify.js build" first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(graphPath, 'utf8'));
}

switch (command) {
  case 'build': {
    console.log('Building Graphify knowledge graph...');
    // Execute build
    import('../scratch/build_graphify.js');
    break;
  }

  case 'explain': {
    const target = args[1];
    if (!target) {
      console.log('Usage: node scripts/graphify.js explain <EntityId>');
      process.exit(1);
    }
    const graph = loadGraph();
    const node = graph.nodes.find(n => n.id.toLowerCase() === target.toLowerCase() || n.label.toLowerCase().includes(target.toLowerCase()));
    if (!node) {
      console.log(`Node "${target}" not found in knowledge graph.`);
      process.exit(1);
    }
    console.log(`\n=== Node Explanation: ${node.label} (${node.id}) ===`);
    console.log(`- Type: ${node.type}`);
    console.log(`- Community: ${node.community}`);
    console.log(`- Total Degree: ${node.degree} (In: ${node.inDegree}, Out: ${node.outDegree})`);
    if (node.file) console.log(`- File Path: ${node.file}`);
    if (node.desc) console.log(`- Description: ${node.desc}`);

    const incoming = graph.links.filter(l => l.target === node.id);
    const outgoing = graph.links.filter(l => l.source === node.id);

    console.log(`\nIncoming Dependencies (${incoming.length}):`);
    incoming.forEach(l => console.log(`  <- [${l.relation}] from ${l.source}`));

    console.log(`\nOutgoing Dependencies (${outgoing.length}):`);
    outgoing.forEach(l => console.log(`  -> [${l.relation}] to ${l.target}`));
    break;
  }

  case 'query': {
    const queryStr = args.slice(1).join(' ').toLowerCase();
    if (!queryStr) {
      console.log('Usage: node scripts/graphify.js query <keyword>');
      process.exit(1);
    }
    const graph = loadGraph();
    const matched = graph.nodes.filter(n => 
      n.id.toLowerCase().includes(queryStr) || 
      n.label.toLowerCase().includes(queryStr) ||
      (n.desc && n.desc.toLowerCase().includes(queryStr))
    );

    console.log(`\n=== Graph Query Results for "${queryStr}" (${matched.length} matches) ===`);
    matched.forEach(n => {
      console.log(`\n• [${n.type.toUpperCase()}] ${n.label} (ID: ${n.id})`);
      console.log(`  Community: ${n.community} | Degree: ${n.degree}`);
      if (n.desc) console.log(`  Desc: ${n.desc}`);

      const neighbors = graph.links
        .filter(l => l.source === n.id || l.target === n.id)
        .map(l => l.source === n.id ? `-> (${l.relation}) ${l.target}` : `<- (${l.relation}) ${l.source}`);
      console.log(`  Direct links (${neighbors.length}): ${neighbors.slice(0, 5).join(', ')}${neighbors.length > 5 ? '...' : ''}`);
    });
    break;
  }

  case 'path': {
    const sourceId = args[1];
    const targetId = args[2];
    if (!sourceId || !targetId) {
      console.log('Usage: node scripts/graphify.js path <SourceId> <TargetId>');
      process.exit(1);
    }
    const graph = loadGraph();
    const adj = new Map();
    graph.links.forEach(l => {
      if (!adj.has(l.source)) adj.set(l.source, []);
      adj.get(l.source).push({ next: l.target, rel: l.relation });
    });

    // BFS
    const queue = [[sourceId]];
    const visited = new Set([sourceId]);
    let foundPath = null;

    while (queue.length > 0) {
      const curPath = queue.shift();
      const last = curPath[curPath.length - 1];

      if (last.toLowerCase() === targetId.toLowerCase()) {
        foundPath = curPath;
        break;
      }

      const neighbors = adj.get(last) || [];
      for (const n of neighbors) {
        if (!visited.has(n.next)) {
          visited.add(n.next);
          queue.push([...curPath, n.next]);
        }
      }
    }

    if (foundPath) {
      console.log(`\n=== Path Found from ${sourceId} to ${targetId} (${foundPath.length - 1} hops) ===`);
      console.log(foundPath.join(' -> '));
    } else {
      console.log(`\nNo direct path found from ${sourceId} to ${targetId}.`);
    }
    break;
  }

  case 'dfs': {
    const target = args[1];
    const budget = parseInt(args[2] || '20', 10);
    const graph = loadGraph();
    const adj = new Map();
    graph.links.forEach(l => {
      if (!adj.has(l.source)) adj.set(l.source, []);
      adj.get(l.source).push({ next: l.target, rel: l.relation });
    });

    console.log(`\n=== DFS Trace from "${target}" (Budget: ${budget}) ===`);
    const visited = new Set();
    function dfsTrace(node, depth = 0) {
      if (visited.size >= budget || visited.has(node)) return;
      visited.add(node);
      const indent = '  '.repeat(depth);
      console.log(`${indent}• ${node}`);
      const nexts = adj.get(node) || [];
      nexts.forEach(n => {
        dfsTrace(n.next, depth + 1);
      });
    }
    dfsTrace(target);
    break;
  }

  default: {
    console.log(`
Graphify CLI (JJK 5E Knowledge Graph)
Commands:
  node scripts/graphify.js query <keyword>       - Search nodes & immediate neighbors
  node scripts/graphify.js explain <EntityId>    - Inspect a node and all in/out dependencies
  node scripts/graphify.js path <NodeA> <NodeB>  - Find shortest connection path
  node scripts/graphify.js dfs <NodeId> [budget] - Deep call chain & reachability trace
  node scripts/graphify.js build                 - Rebuild graphify-out assets
`);
  }
}
