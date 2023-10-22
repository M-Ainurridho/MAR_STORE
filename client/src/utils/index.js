let i = 0;
export const sliderConfiguration = () => {
   const images = Array.from(document.querySelectorAll(".slider"))
   
   images.forEach(image => {
      
   })
};

export const next = () => {
   i += 1;
   sliderConfiguration();
};

export const prev = () => {
   i -= 1;
   sliderConfiguration();
};
