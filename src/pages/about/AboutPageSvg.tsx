import React from 'react';

interface Props {
  id: string
}

export const AboutPageSvg = ({ id }: Props) => {
  switch (id) {
    case 'telegram':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11.5" stroke="#FF6501" />
          <path d="M7.74272 13.1443C7.74017 13.1458 7.73716 13.1461 7.73436 13.1453L4.50891 12.1754C3.81071 11.9697 3.80683 11.506 4.66536 11.1731L17.2498 6.48573C17.9803 6.199 18.3941 6.56177 18.1574 7.47058L16.015 17.2194C15.865 17.9138 15.4319 18.0796 14.8306 17.7592L12.1969 15.8798C11.8101 15.6038 11.2825 15.6381 10.9347 15.9618L9.99496 16.8367C9.83722 16.9838 9.70921 17.1097 9.46614 17.1408C9.22435 17.1733 9.02524 17.1034 8.87913 16.717L7.75822 13.1505C7.75617 13.144 7.74866 13.141 7.74272 13.1443Z" fill="#FF6501" />
        </svg>
      );
    case 'viber':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11.5" stroke="#FF6501" />
          <path fillRule="evenodd" clipRule="evenodd" d="M11.2089 5.01C11.1694 5.01359 11.0078 5.0261 10.8499 5.03782C10.3263 5.07663 9.60337 5.18963 9.10636 5.31034C7.85841 5.61344 6.81377 6.19471 6.1951 6.93024C5.68806 7.53304 5.44035 8.08699 5.27022 8.9985C4.93993 10.7681 4.91199 12.3848 5.18879 13.712C5.47785 15.098 5.97753 15.9831 6.82179 16.6048C7.11455 16.8203 7.26786 16.8925 7.96532 17.1434C8.11616 17.1977 8.26248 17.2628 8.29042 17.2881L8.34123 17.3341L8.33526 17.8899C8.33197 18.1955 8.33105 18.7953 8.3332 19.2228L8.33714 20H8.64122H8.94527L9.94117 19.0322C10.4889 18.5 11.0098 17.9877 11.0986 17.894L11.2601 17.7235L11.7832 17.7096C12.9956 17.6774 14.0539 17.6176 14.5729 17.5519C15.8577 17.3893 16.7501 17.0466 17.4391 16.4514C17.7646 16.1702 18.0105 15.8501 18.2249 15.4285C18.8018 14.2944 19.0278 13.0441 18.9973 11.1556C18.9856 10.4291 18.9736 10.2519 18.9002 9.72057C18.8156 9.10837 18.6601 8.43129 18.509 8.01711C18.2225 7.23172 17.72 6.59718 17.026 6.14443C16.2326 5.62688 15.3612 5.34139 13.9883 5.1493C13.18 5.03617 12.5944 4.99588 11.8242 5.00033C11.5253 5.00205 11.2484 5.00641 11.2089 5.01ZM13.0142 7.33054C14.1807 7.54317 15.1613 8.27767 15.656 9.30939C15.8828 9.78234 15.9926 10.2697 15.9927 10.8037C15.9927 11.2744 15.9301 11.633 15.8285 11.7427C15.7395 11.8389 15.559 11.8696 15.4392 11.8089C15.3548 11.7663 15.2745 11.6681 15.2593 11.5892C15.2524 11.553 15.2621 11.4472 15.281 11.3541C15.2998 11.261 15.3201 11.0539 15.3259 10.8939C15.3347 10.655 15.3288 10.5588 15.2932 10.355C15.0802 9.13641 14.1485 8.20529 12.9114 7.97457C12.6399 7.92394 12.1518 7.9235 11.8727 7.97362C11.6337 8.01657 11.5465 8.00762 11.4528 7.93058C11.2399 7.75542 11.3229 7.4364 11.6004 7.36336C11.9125 7.28116 12.6495 7.26405 13.0142 7.33054ZM9.25554 7.97657C9.37693 8.02615 9.53954 8.16112 9.7431 8.38125C10.0874 8.75354 10.3588 9.13746 10.5742 9.55658C10.6839 9.76999 10.696 9.80615 10.6959 9.91761C10.6955 10.128 10.6109 10.2561 10.3268 10.4764C10.1697 10.5983 10.0301 10.7465 9.97735 10.8474C9.93518 10.9281 9.92695 10.9722 9.92751 11.1146C9.92808 11.2611 9.93842 11.311 10.001 11.4692C10.2562 12.1138 10.7972 12.7396 11.455 13.1509C11.668 13.2841 12.1577 13.5152 12.2867 13.5435C12.5047 13.5912 12.724 13.5022 12.8846 13.3008C12.9331 13.2401 13.0194 13.1391 13.0765 13.0762C13.3696 12.7535 13.794 12.7429 14.2579 13.0465C14.5729 13.2527 15.3846 13.8579 15.4784 13.9565C15.6456 14.1324 15.6971 14.2845 15.6589 14.4901C15.5655 14.9937 15.0087 15.5547 14.4385 15.7195C14.2818 15.7648 14.0268 15.7646 13.8652 15.719C13.7003 15.6725 13.3438 15.5182 12.9319 15.3151C10.9331 14.3293 9.41423 12.9147 8.38945 11.0845C8.20962 10.7633 8.08082 10.4838 7.86735 9.95123C7.68126 9.48706 7.64776 9.33625 7.68052 9.11038C7.7469 8.65271 8.02226 8.30371 8.49099 8.08318C8.80975 7.93319 9.06295 7.89789 9.25554 7.97657ZM12.842 8.29745C13.7509 8.45243 14.5621 9.12558 14.8591 9.97128C14.9808 10.3179 15.0328 10.7917 14.9863 11.1298C14.9474 11.4117 14.862 11.5057 14.6447 11.5057C14.4922 11.5057 14.4017 11.4501 14.3431 11.3206C14.3059 11.2384 14.3048 11.2167 14.3275 11.0158C14.367 10.6656 14.3105 10.3448 14.151 10.0141C13.8732 9.43792 13.3444 9.04525 12.6991 8.93592C12.5543 8.91137 12.4411 8.9071 12.2037 8.91721C11.9165 8.92944 11.8916 8.92759 11.8292 8.88937C11.7312 8.82937 11.6808 8.73637 11.6807 8.61536C11.6806 8.44429 11.796 8.31771 11.9794 8.28768C12.1569 8.25864 12.6468 8.26417 12.842 8.29745ZM12.7564 9.29178C13.2089 9.40278 13.5819 9.69367 13.8122 10.1152C13.9299 10.3306 13.98 10.5082 13.9923 10.7535C14.0022 10.9508 13.9998 10.9684 13.9545 11.0325C13.8441 11.1888 13.6682 11.2364 13.5184 11.1505C13.3933 11.0787 13.3611 11.021 13.3402 10.8314C13.2991 10.4575 13.132 10.1896 12.8319 10.0163C12.7203 9.95189 12.5014 9.89119 12.3785 9.89061C12.3275 9.89037 12.2479 9.87336 12.2017 9.85284C11.936 9.73487 11.9504 9.35532 12.2242 9.25836C12.3255 9.22252 12.5252 9.23506 12.7564 9.29178Z" fill="#FF6501" />
        </svg>

      );
    default:
      return <svg></svg>;
  }
};
