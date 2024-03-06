import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'; 

export function useIntersectionObserverEffect() {
  const target = ref<HTMLElement | null>(null);
  const targetIsVisible = ref<boolean>(false);
  const hasIntersected = ref<boolean>(false);

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !hasIntersected.value) {
        // s'exécute uniquement si l'élément devient visible pour la première fois
        targetIsVisible.value = true;
        hasIntersected.value = true; 
        stop(); // arrête l'observation après le premier déclenchement
      }
    },
  );

  return { target, targetIsVisible, stop };
};