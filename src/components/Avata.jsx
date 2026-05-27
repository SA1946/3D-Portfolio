

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

// Debug controls removed from production — hardcoded to false
const headFollow = false;
const cursorFollow = false;

export function Avata(props) {
  const { animation } = props;
  const groupRef = useRef();

  // Fix: single useGLTF call instead of two (was loading the same GLB twice)
  const { nodes, materials } = useGLTF("Models/68b04e169326073cf8d367f8.glb");

  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: standingAnimation } = useFBX(
    "animations/Standing W_Briefcase Idle.fbx"
  );
  const { animations: fallAnimation } = useFBX("animations/Falling.fbx");
  // console.log(typingAnimation);

  // Create animations array with proper error checking
  const animationsArray = useMemo(() => {
    const animations = [];

    if (typingAnimation?.[0]) {
      typingAnimation[0].name = "Typing";
      animations.push(typingAnimation[0]);
    }

    if (standingAnimation?.[0]) {
      standingAnimation[0].name = "Standing";
      animations.push(standingAnimation[0]);
    }

    if (fallAnimation?.[0]) {
      fallAnimation[0].name = "Falling";
      animations.push(fallAnimation[0]);
    }

    return animations;
  }, [typingAnimation, standingAnimation, fallAnimation]);

  const { actions } = useAnimations(animationsArray, groupRef);

  useFrame((state) => {
    if (headFollow && groupRef.current) {
      const head = groupRef.current.getObjectByName("Head");
      if (head) {
        head.lookAt(state.camera.position);
      }
    }
    if (cursorFollow && groupRef.current) {
      const spine = groupRef.current.getObjectByName("Spine2");
      if (spine) {
        const target = new Vector3(state.mouse.x, state.mouse.y, 1);
        spine.lookAt(target);
      }
    }
  });

  useEffect(() => {
    if (!actions || !animation) return;

    const currentAction = actions[animation];

    if (currentAction) {
      Object.values(actions).forEach((action) => {
        if (action !== currentAction && action.isRunning()) {
          action.fadeOut(0.5);
        }
      });

      currentAction.reset().fadeIn(0.5).play();

      return () => {
        if (currentAction) {
          currentAction.fadeOut(0.5);
        }
      };
    } else {
      console.warn(
        `Animation "${animation}" not found. Available:`,
        Object.keys(actions)
      );
    }
  }, [animation, actions]);

  // useEffect(() => {
  //   if (materials) {
  //     Object.values(materials).forEach((material) => {
  //       if (material) {
  //         material.wireframe = wireFrame;
  //       }
  //     });
  //   }
  // }, [wireFrame, materials]);

  // console.log(Object.keys(nodes));

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          frustumCulled={false}
        />
      </group>
    </group>
  );
}

// Avatar GLB preloaded eagerly — it's small (862 KB) and needed immediately
useGLTF.preload("Models/68b04e169326073cf8d367f8.glb");
// FBX preloads removed — they now load after the scene is visible
//  lazy loading, saving ~4 MB of blocking startup bandwidth
