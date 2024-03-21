import { Box, Plane, Text } from "@react-three/drei";
import { RecastNavmesh } from "./RecastNavmesh";
import { suspend } from "suspend-react";

const Test = () => {
  suspend(() => Promise.resolve(1));

  return null;
};

export const Scene = () => (
  <>
    <group position-y={2}>
      <Text>Testing</Text>
    </group>

    <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
      <meshStandardMaterial color="#f00" />
    </Box>

    {/* uncomment below, and the scene won't render - it will fail silently */}
    {/* <Test /> */}

    {/* uncomment below, and the scene won't render - it will crash (exception in browser console) */}
    {/* <RecastNavmesh>
        <Plane args={[100, 100]} rotation-x={-Math.PI / 2}>
          <meshStandardMaterial color="#333" />
        </Plane>
      </RecastNavmesh> */}
  </>
);
