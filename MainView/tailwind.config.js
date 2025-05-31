/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      max: { max: '99999px' },
      xxxl: { max: '2999px' },
      xxl: { max: '1919px' },
      xl: { max: '1399px' },
      lg: { max: '1199px' },
      md: { max: '991px' },
      sm: { max: '767px' },
      xs: { max: '575px' },
      xxs: { max: '479px' },
      tn: { max: '383px' },
      'xxxl-max': { min: '3000px', max: '99999px' },
      'xxl-max': { min: '1920px', max: '99999px' },
      'xxl-xxxl': { min: '1920px', max: '2999px' },
      'xl-max': { min: '1400px', max: '99999px' },
      'xl-xxxl': { min: '1400px', max: '2999px' },
      'xl-xxl': { min: '1400px', max: '1919px' },
      'lg-max': { min: '1200px', max: '99999px' },
      'lg-xxxl': { min: '1200px', max: '2999px' },
      'lg-xxl': { min: '1200px', max: '1919px' },
      'lg-xl': { min: '1200px', max: '1399px' },
      'md-max': { min: '992px', max: '99999px' },
      'md-xxxl': { min: '992px', max: '2999px' },
      'md-xxl': { min: '992px', max: '1919px' },
      'md-xl': { min: '992px', max: '1399px' },
      'md-lg': { min: '992px', max: '1199px' },
      'sm-max': { min: '768px', max: '99999px' },
      'sm-xxxl': { min: '768px', max: '2999px' },
      'sm-xxl': { min: '768px', max: '1919px' },
      'sm-xl': { min: '768px', max: '1399px' },
      'sm-lg': { min: '768px', max: '1199px' },
      'sm-md': { min: '768px', max: '991px' },
      'xs-max': { min: '576px', max: '99999px' },
      'xs-xxxl': { min: '576px', max: '2999px' },
      'xs-xxl': { min: '576px', max: '1919px' },
      'xs-xl': { min: '576px', max: '1399px' },
      'xs-lg': { min: '576px', max: '1199px' },
      'xs-md': { min: '576px', max: '991px' },
      'xs-sm': { min: '576px', max: '767px' },
      'xxs-max': { min: '480px', max: '99999px' },
      'xxs-xxxl': { min: '480px', max: '2999px' },
      'xxs-xxl': { min: '480px', max: '1919px' },
      'xxs-xl': { min: '480px', max: '1399px' },
      'xxs-lg': { min: '480px', max: '1199px' },
      'xxs-md': { min: '480px', max: '991px' },
      'xxs-sm': { min: '480px', max: '767px' },
      'xxs-xs': { min: '480px', max: '575px' },
      'tn-max': { min: '384px', max: '99999px' },
      'tn-xxxl': { min: '384px', max: '2999px' },
      'tn-xxl': { min: '384px', max: '1919px' },
      'tn-xl': { min: '384px', max: '1399px' },
      'tn-lg': { min: '384px', max: '1199px' },
      'tn-md': { min: '384px', max: '991px' },
      'tn-sm': { min: '384px', max: '767px' },
      'tn-xs': { min: '384px', max: '575px' },
      'tn-xxs': { min: '384px', max: '479px' },
    },
    colors: {},
    fontFamily: {
      Roboto: ['Roboto', 'Helvetica', 'Arial', 'serif'],
      Inter: ['Inter', 'Helvetica', 'Arial', 'serif'],
    },
    extend: {
      spacing: {
        ...(() => {
          const result = {};
          for (let spacing = 1; spacing <= 1920; spacing += 1) {
            result[spacing / 4] = `${spacing / 16}rem`;
          }
          return result;
        })(),

        '1/16': '6.25%',
        '1/9': '11.11%',
        '1/8': '12.5%',
        '1/7': '14.28%',
        '1/6': '16.66%',
        '3/16': '18.75%',
        '1/5': '20%',
        '2/9': '22.22%',
        '4/9': '44.44%',
        '1/4': '25%',
        '2/7': '28.57%',
        '1/3': '33.33%',
        '3/8': '37.5%',
        '1/2': '50%',
        '2/3': '66.66%',
        '3/4': '75%',
        '4/6': '66.66%',
        '5/6': '83.33%',
        full: '100%',

        ...(() => {
          const result = {};
          for (let spacing = 0; spacing <= 99; spacing += 1) {
            result[`${spacing}%`] = `${spacing}%`;
          }
          return result;
        })(),

        unset: 'unset',
      },
      fontSize: {
        ...(() => {
          const result = {};
          for (let spacing = 12; spacing <= 220; spacing += 1) {
            result[spacing / 4] = `${spacing / 16}rem`;
          }
          return result;
        })(),
      },
      lineHeight: {
        ...(() => {
          const result = {};
          for (let height = 100; height <= 300; height += 1) {
            result[height / 100] = `${height / 100}`;
          }
          return result;
        })(),
      },
      opacity: {
        ...(() => {
          const result = {};
          for (let opacity = 100; opacity <= 100; opacity += 1) {
            result[opacity / 100] = `${opacity / 100}`;
          }
          return result;
        })(),
      },
      letterSpacing: {
        0: '0px',
        1: '1px',
        2: '2px',
        0.4: '0.4px',
        0.8: '0.8px',
        1.2: '1.2px',
        1.5: '1.5px',
        1.6: '1.6px',
        2.4: '2.4px',
      },
      zIndex: {
        1: '1',
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
        998: '998',
        999: '999',
        1000: '1000',
      },
      backgroundImage: { src: 'var(--src)' },
    },
  },
};
