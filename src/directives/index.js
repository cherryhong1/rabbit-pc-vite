import bgImg from "@/assets/images/bg.jpg";

export const defineDirective = (app) => {
  app.directive("lazyload", {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([{ isIntersection }]) => {
          if (isIntersection) {
            observer.unobserve();
            el.onerror = () => {
              el.src = bgImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0.01,
        }
      );
      observer.observe(el);
    },
  });
};
