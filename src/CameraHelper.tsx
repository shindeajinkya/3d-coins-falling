import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useEffect } from "react";
import * as THREE from "three";

interface IProps {}

/**
 * @author
 * @function @CameraHelper
 **/

export const CameraHelper: FC<IProps> = () => {
  const { position } = useControls("Camera", {
    position: {
      value: {
        x: 0,
        y: 8,
        z: 0,
      },
      step: 0.01,
    },
  });

  const { camera } = useThree();

  useEffect(() => {
    console.log(position);
    camera.position.set(position.x, position.y, position.z);
  }, [position, camera.position]);

  return null;
};
