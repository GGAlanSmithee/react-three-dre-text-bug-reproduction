import * as THREE from "three";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { NavMesh, NavMeshQuery, init as initRecast } from "recast-navigation";
import { threeToSoloNavMesh } from "recast-navigation/three";
import { suspend } from "suspend-react";

// https://github.com/isaac-mason/recast-navigation-js/blob/main/packages/recast-navigation/.storybook/stories/crowd.stories.tsx

type NavmeshProps = PropsWithChildren<{}>;

export const navMeshConfig = {
  cs: 0.2,
  ch: 0.2,
  walkableSlopeAngle: 50,
  walkableHeight: 5,
  walkableClimb: 3,
  walkableRadius: 1,
  maxEdgeLen: 12,
  maxSimplificationError: 1.3,
  minRegionArea: 8,
  mergeRegionArea: 20,
  maxVertsPerPoly: 6,
  detailSampleDist: 6,
  detailSampleMaxError: 1,
};

const Navmesh = ({ children }: NavmeshProps) => {
  const navMesh = useRef<NavMesh | null>(null);
  const group = useRef<THREE.Group>(null!);

  const init = useCallback(() => {
    if (navMesh.current) {
      navMesh.current.destroy();
      navMesh.current = null as NavMesh | null;
    }

    const meshes: THREE.Mesh[] = [];

    group.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    const { success, navMesh: newNawMesh } = threeToSoloNavMesh(meshes, navMeshConfig);

    if (!success) {
      if (navMesh.current) {
        navMesh.current.destroy();
        navMesh.current = null as NavMesh | null;
      }

      return;
    }

    navMesh.current = newNawMesh;
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <group ref={group}>
      {children}
    </group>
  );
};

const RecastInit = (props: { children: JSX.Element }) => {
  suspend(() => initRecast(), []);

  return props.children;
};

export const RecastNavmesh = ({ children }: NavmeshProps) => {
  return (
    <RecastInit>
      <Navmesh>{children}</Navmesh>
    </RecastInit>
  );
};
