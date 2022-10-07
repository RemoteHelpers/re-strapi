import React from 'react';

interface Props {
  id: string
}

export const VacancySvg = ({ id }: Props) => {
  switch (id) {
    case 'hot':
      return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.3638 11.4555C19.8898 10.3888 19.2008 9.43131 18.3398 8.64304L17.6294 7.99118C17.6053 7.96966 17.5762 7.95438 17.5448 7.94669C17.5134 7.93901 17.4806 7.93915 17.4493 7.94711C17.418 7.95506 17.389 7.97058 17.3651 7.99232C17.3412 8.01405 17.3229 8.04132 17.312 8.07175L16.9946 8.98239C16.7969 9.55368 16.4331 10.1372 15.918 10.7109C15.8838 10.7475 15.8447 10.7573 15.8179 10.7597C15.791 10.7622 15.7495 10.7573 15.7129 10.7231C15.6787 10.6938 15.6616 10.6499 15.6641 10.6059C15.7544 9.1362 15.3149 7.47849 14.353 5.67429C13.5571 4.17526 12.4512 3.00583 11.0693 2.1904L10.061 1.59714C9.9292 1.51901 9.76074 1.62155 9.76807 1.77536L9.82178 2.94724C9.8584 3.74802 9.76562 4.45603 9.5459 5.0444C9.27734 5.76462 8.8916 6.43357 8.39844 7.03415C8.05523 7.45154 7.66624 7.82907 7.23877 8.15964C6.20924 8.95106 5.3721 9.96514 4.79004 11.1259C4.20941 12.2969 3.90696 13.5861 3.90625 14.893C3.90625 16.0454 4.1333 17.1611 4.58252 18.2134C5.01628 19.2265 5.64223 20.1459 6.42578 20.9209C7.2168 21.7021 8.13477 22.3174 9.15771 22.7446C10.2173 23.1889 11.3403 23.4135 12.5 23.4135C13.6597 23.4135 14.7827 23.1889 15.8423 22.747C16.8627 22.3223 17.7906 21.7029 18.5742 20.9233C19.3652 20.1421 19.9853 19.229 20.4175 18.2158C20.866 17.1664 21.0961 16.0367 21.0937 14.8955C21.0937 13.7041 20.8496 12.5468 20.3638 11.4555Z" fill="white" />
        </svg>
      );
    case 'star':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0746 2.633C11.3946 1.789 12.6056 1.789 12.9266 2.633L14.9966 8.367C15.0688 8.55379 15.1959 8.71428 15.3613 8.8273C15.5266 8.94031 15.7223 9.00053 15.9226 9H21.0096C21.9496 9 22.3596 10.17 21.6206 10.743L18.0006 14C17.8384 14.1247 17.7199 14.2975 17.6621 14.4937C17.6042 14.6898 17.61 14.8993 17.6786 15.092L19.0006 20.695C19.3226 21.595 18.2806 22.368 17.4926 21.814L12.5756 18.694C12.4072 18.5757 12.2064 18.5122 12.0006 18.5122C11.7948 18.5122 11.594 18.5757 11.4256 18.694L6.50856 21.814C5.72156 22.368 4.67856 21.594 5.00056 20.695L6.32257 15.092C6.39114 14.8993 6.39692 14.6898 6.33907 14.4937C6.28122 14.2975 6.16272 14.1247 6.00057 14L2.38056 10.743C1.64056 10.17 2.05256 9 2.99056 9H8.07756C8.27786 9.00067 8.47363 8.9405 8.63898 8.82747C8.80433 8.71444 8.93147 8.55387 9.00357 8.367L11.0736 2.633H11.0746Z" stroke="#FF6501" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      );
    default:
      return <svg></svg>;
  }
};