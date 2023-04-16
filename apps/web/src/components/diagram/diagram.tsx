import { useDebounce } from "react-use";
import { Background, ConnectionMode, ReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import { createSchemaStore } from "../store/schemaStore";
import DiagramContextMenu from "./components/diagram-context-menu";
import relationEdge from "./edges/relationEdge";
import EnumNode from "./nodes/enumNode";
import ModelNode from "./nodes/modelNode";

const nodeTypes = {
  model: ModelNode,
  enum: EnumNode,
};

const edgeTypes = {
  relation: relationEdge,
};

const Diagram = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, saveLayout } =
    createSchemaStore(
      (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        saveLayout: state.saveLayout,
      }),
      shallow
    );

  useDebounce(
    () => {
      void saveLayout(nodes, edges);
    },
    500,
    [nodes, edges]
  );

  return (
    <div className="h-full w-full">
      <div className="zoompanflow">
        <div className="reactflow-wrapper">
          <DiagramContextMenu>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionMode={ConnectionMode.Loose}
              minZoom={0.1}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
            >
              <Background color="grey" />
              {/* <Controls
                position="top-left"
                showZoom={false}
                showInteractive={false}
              >
                <ControlButton
                  title="Reset Layout"
                  onClick={() => {
                    void resetLayout();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ControlButton>
                <ControlButton title="Add Model">
                  <AddModelModal>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </AddModelModal>
                </ControlButton>
              </Controls> */}
            </ReactFlow>
          </DiagramContextMenu>
        </div>
        <svg width="0" height="0">
          <defs>
            <marker
              id="relation-one"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-[#5c7194]"
                strokeWidth="3"
                strokeLinecap="square"
                fill="none"
                points="-10,-8 -10,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-[#5c7194]"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
            <marker
              id="relation-one-selected"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-black"
                strokeWidth="3"
                strokeLinecap="square"
                fill="none"
                points="-10,-8 -10,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-black"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>

            <marker
              id="relation-many"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-[#5c7194]"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
                points="0,-8 -10,0 0,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-[#5c7194]"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
            <marker
              id="relation-many-selected"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-black"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
                points="0,-8 -10,0 0,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-black"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>

            <marker
              id="relation-one-dark"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="text-edge stroke-current"
                strokeWidth="3"
                strokeLinecap="square"
                fill="none"
                points="-10,-8 -10,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="text-edge stroke-current"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
            <marker
              id="relation-one-selected-dark"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-white"
                strokeWidth="3"
                strokeLinecap="square"
                fill="none"
                points="-10,-8 -10,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-white"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>

            <marker
              id="relation-many-dark"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-[#5c7194]"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
                points="0,-8 -10,0 0,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-[#5c7194]"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
            <marker
              id="relation-many-selected-dark"
              markerWidth="12.5"
              markerHeight="12.5"
              viewBox="-10 -10 20 20"
              orient="auto-start-reverse"
              refX="-10"
              refY="0"
            >
              <polyline
                className="stroke-current text-white"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
                points="0,-8 -10,0 0,8"
              />
              <line
                x1="-8"
                y1="0"
                x2="0"
                y2="0"
                className="stroke-current text-white"
                strokeLinejoin="round"
                strokeLinecap="square"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Diagram;
