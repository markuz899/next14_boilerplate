import React from "react";
/* eslint-disable */

const icons: any = {
  default: {
    d: "M306.704 241.985a58.514 58.514 0 0 1 0 30.246 41.026 41.026 0 0 1-6.248 13.419 31.942 31.942 0 0 1-10.934 9.585 36.72 36.72 0 0 1-31.8 0 31.951 31.951 0 0 1-10.934-9.585 41.069 41.069 0 0 1-6.248-13.419 58.4 58.4 0 0 1-.008-30.246 41.087 41.087 0 0 1 6.248-13.419 31.951 31.951 0 0 1 10.934-9.585 36.719 36.719 0 0 1 31.8 0 31.937 31.937 0 0 1 10.942 9.585 41.045 41.045 0 0 1 6.248 13.419zM512.004 257c0 141.385-114.615 256-256 256s-256-114.615-256-256 114.615-256 256-256S512 115.615 512 257zm-406.51-50.586h-13.49v101.388h13.49zm108.488 63.188h-13.49a38.664 38.664 0 0 1-2.556 11.644 28.084 28.084 0 0 1-5.893 9.3 26.837 26.837 0 0 1-8.946 6.106 30.091 30.091 0 0 1-11.857 2.2 33.363 33.363 0 0 1-15.62-3.408 30.505 30.505 0 0 1-10.721-9.159 39.234 39.234 0 0 1-6.177-13.483 65.7 65.7 0 0 1-1.988-16.4 58.765 58.765 0 0 1 1.988-15.34 39.543 39.543 0 0 1 6.177-13.135 30.707 30.707 0 0 1 10.65-9.159 32.947 32.947 0 0 1 15.549-3.408 31.341 31.341 0 0 1 18.389 5.4q7.74 5.393 10.011 16.184h13.49a37.71 37.71 0 0 0-4.834-14.273 35.115 35.115 0 0 0-9.23-10.3 40.457 40.457 0 0 0-12.638-6.248 52.124 52.124 0 0 0-15.052-2.128 48.531 48.531 0 0 0-20.661 4.189 42.71 42.71 0 0 0-15.052 11.429 50.137 50.137 0 0 0-9.159 16.969 67.673 67.673 0 0 0-3.124 20.8 71.513 71.513 0 0 0 2.916 20.739 47.9 47.9 0 0 0 8.733 16.756 40.442 40.442 0 0 0 14.626 11.15 48.871 48.871 0 0 0 20.59 4.047q19.455 0 30.672-10.65t13.203-29.822zm108.2-12.494a65.332 65.332 0 0 0-3.053-19.951 50.263 50.263 0 0 0-9.159-16.969 44.7 44.7 0 0 0-15.194-11.786 53.08 53.08 0 0 0-42.32 0 44.715 44.715 0 0 0-15.19 11.786 50.3 50.3 0 0 0-9.159 16.969 65.358 65.358 0 0 0-3.051 19.951 65.326 65.326 0 0 0 3.053 19.951 50.28 50.28 0 0 0 9.159 16.969 43.951 43.951 0 0 0 15.19 11.715 53.856 53.856 0 0 0 42.32 0 43.933 43.933 0 0 0 15.194-11.715 50.245 50.245 0 0 0 9.159-16.969 65.328 65.328 0 0 0 3.051-19.951zm97.128-50.694h-12.78v82.218h-.284l-53.392-82.218h-14.342v101.388h12.78v-81.366h.284l52.966 81.366h14.768z",
    width: "512",
  },
  share: {
    d: "M390.685,512a92.014,92.014,0,0,1-84.193-129.148l-88.365-55.1a108.321,108.321,0,1,1,.086-144.687l88.223-54.045a92.258,92.258,0,1,1,20.523,29.319L237.4,213.206a108.323,108.323,0,0,1-.053,84.435l89.7,55.933A92,92,0,1,1,390.685,512Zm0-148.317a56.3,56.3,0,1,0,56.3,56.3A56.361,56.361,0,0,0,390.685,363.683Zm-253.07-180.92a72.6,72.6,0,1,0,72.6,72.6A72.682,72.682,0,0,0,137.615,182.763ZM390.685,35.721a56.3,56.3,0,1,0,56.3,56.3A56.362,56.362,0,0,0,390.685,35.721Z",
    width: "512",
  },
  trash: {
    d: "M351.723,512H166.241a94.581,94.581,0,0,1-94.474-94.474V163.281a17.861,17.861,0,0,1,35.721,0V417.526a58.82,58.82,0,0,0,58.753,58.753H351.723a58.82,58.82,0,0,0,58.753-58.753V163.281a17.86,17.86,0,0,1,35.721,0V417.526A94.581,94.581,0,0,1,351.723,512ZM305.446,392.2a17.861,17.861,0,0,1-17.861-17.861V205.586a17.861,17.861,0,0,1,35.721,0V374.34A17.861,17.861,0,0,1,305.446,392.2Zm-96.859,0a17.861,17.861,0,0,1-17.861-17.861V205.586a17.86,17.86,0,0,1,35.721,0V374.34A17.861,17.861,0,0,1,208.587,392.2ZM463.2,112.027H48.8a17.86,17.86,0,1,1,0-35.72H164.265V17.86A17.86,17.86,0,0,1,182.125,0H331.906a17.861,17.861,0,0,1,17.861,17.86V76.307H463.2a17.86,17.86,0,1,1,0,35.72ZM199.985,76.307H314.046V35.721H199.985Z",
    width: "512",
  },
  zoom: {
    d: "M494.14,512H17.86A17.86,17.86,0,0,1,0,494.14V17.86A17.86,17.86,0,0,1,17.86,0H494.14A17.86,17.86,0,0,1,512,17.86V494.14A17.86,17.86,0,0,1,494.14,512ZM35.721,476.279H476.279V35.721H35.721ZM185.174,202.617a17.806,17.806,0,0,1-12.629-5.231L91.678,116.518v15.994a17.861,17.861,0,0,1-35.721,0V73.4a17.812,17.812,0,0,1,5.06-12.457l0,0,.011-.012.013-.013,0,0,.281-.281.006-.006.01-.01A17.8,17.8,0,0,1,73.71,55.539h59.22a17.861,17.861,0,1,1,0,35.721H116.936L197.8,172.127a17.861,17.861,0,0,1-12.629,30.49Z",
    width: "512",
  },
  heart: {
    d: "M255.95,485.684a17.857,17.857,0,0,1-7.106-1.475l-10.263-4.45A442.391,442.391,0,0,1,28.068,289.089,227.839,227.839,0,0,1,1.842,212.7,135.768,135.768,0,0,1,0,192.337C0,100.793,67.692,26.316,150.9,26.316c39.857,0,77.123,16.815,105.1,46.811,27.978-30,65.245-46.811,105.1-46.811,83.205,0,150.9,74.477,150.9,166.021a135.876,135.876,0,0,1-1.842,20.359,227.832,227.832,0,0,1-26.226,76.393,442.391,442.391,0,0,1-210.513,190.67L263,484.234A17.844,17.844,0,0,1,255.95,485.684ZM150.9,62.037c-63.509,0-115.177,58.452-115.177,130.3a101.267,101.267,0,0,0,1.426,14.923,192.223,192.223,0,0,0,22.131,64.453A406.669,406.669,0,0,0,252.792,446.986l3.192,1.385,3.281-1.409A406.676,406.676,0,0,0,452.722,271.713a192.238,192.238,0,0,0,22.131-64.453,101.252,101.252,0,0,0,1.426-14.923c0-71.848-51.668-130.3-115.177-130.3-35.453,0-68.423,18.106-90.456,49.675a17.86,17.86,0,0,1-29.292,0C219.321,80.143,186.351,62.037,150.9,62.037Z",
    width: "512",
  },
  heartFill: {
    d: "M255.95,485.684a17.858,17.858,0,0,1-7.106-1.475l-10.263-4.45A442.391,442.391,0,0,1,28.068,289.089,227.839,227.839,0,0,1,1.842,212.7,135.768,135.768,0,0,1,0,192.337C0,100.793,67.692,26.316,150.9,26.316c39.857,0,77.123,16.815,105.1,46.811,27.978-30,65.245-46.811,105.1-46.811,83.205,0,150.9,74.477,150.9,166.021a135.876,135.876,0,0,1-1.842,20.359,227.832,227.832,0,0,1-26.226,76.393,442.391,442.391,0,0,1-210.513,190.67L263,484.234A17.846,17.846,0,0,1,255.95,485.684Z",
    width: "512",
  },
  disabled: {
    d: "m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z",
    width: "512",
  },
  map: {
    d: "M573.942 35.836L404.893.618A24.562 24.562 0 00399.912.1a22.822 22.822 0 00-9.536 2.074 20.521 20.521 0 00-3.424-.3 22.746 22.746 0 00-10.573 2.694L205.5 93.554a27.23 27.23 0 00-3.36 2.088 25.3 25.3 0 00-3.619-1.465L28.989 41.202a23.877 23.877 0 00-7.153-1.115C9.648 40.089.1 49.904.1 62.436v368.406c0 11.931 8.588 23.615 19.978 27.172l169.535 52.973a23.948 23.948 0 007.153 1.113 21.659 21.659 0 007.832-1.469 20.391 20.391 0 004.121.414 22.756 22.756 0 0010.575-2.692l170.876-88.989a27.545 27.545 0 004.049-2.612 25.819 25.819 0 004.589 1.417l169.047 35.215a24.444 24.444 0 004.983.518 22.657 22.657 0 0022.737-23.059V62.436a27.637 27.637 0 00-21.633-26.6zM29.962 72.792l158.675 49.581v357.026L29.962 429.816zM218.5 475.097V121.62a4.739 4.739 0 011.035-1.7l157.642-82.1V391.3a4.8 4.8 0 01-1.033 1.7zm347.21-52.661l-158.675-33.055V31.569L565.71 64.624z",
    width: "600",
  },
  download: {
    group: (
      <>
        <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
      </>
    ),
    width: "512",
  },
  check: {
    d: "m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0",
    width: "512",
  },
  eye: {
    d: "M257.004 448C96.343 448 6.977 272.984 3.244 265.538a21.416 21.416 0 010-19.072C6.977 239.021 96.344 64 257.004 64s250.027 175.021 253.76 182.466a21.423 21.423 0 010 19.072C507.027 272.984 417.661 448 257.004 448zm-210.3-192.019c19.989 34.3 95.595 149.356 210.3 149.356 115.072 0 190.379-114.967 210.3-149.314-19.984-34.3-95.59-149.356-210.3-149.356-115.076 0-190.383 114.963-210.3 149.314zm210.3 85.355a85.334 85.334 0 1185.333-85.335 85.421 85.421 0 01-85.333 85.335zm0-128a42.667 42.667 0 1042.667 42.667 42.711 42.711 0 00-42.667-42.673z",
    width: "512",
  },
  "eye-not": {
    d: "M191.401 94.779a21.483 21.483 0 0115.94-25.6c16.256-3.847 32.49-6.47 49.706-5.739 160.615 0 249.979 176.336 253.712 183.838a21.72 21.72 0 01-.278 19.753 419.6 419.6 0 01-48.577 72.267 21.248 21.248 0 01-30.057 2.622 21.612 21.612 0 01-2.6-30.285 376.48 376.48 0 0038.014-54.745c-20.012-34.627-95.595-150.462-210.259-150.462-12.906.731-26.878 1.526-39.935 4.6a21.482 21.482 0 01-25.666-16.249zm315.347 381.7a21.33 21.33 0 11-30.164 30.165l-94.548-94.552a233.633 233.633 0 01-124.693 38.249c-161 0-250.362-176.336-254.1-183.838a21.631 21.631 0 01.3-19.774A414.361 414.361 0 0197.936 127.99L7.259 37.311A21.33 21.33 0 0137.423 7.146L140.75 110.474a21.159 21.159 0 016.369 5.535q.065.082.126.165a21.55 21.55 0 011.491 2.286l75.215 75.215a21.328 21.328 0 013.344 2.891l.078.082a21.72 21.72 0 011.763 2.213zM226.326 289.953a42.46 42.46 0 0042.819 9.247l-54.236-54.238a43.185 43.185 0 0011.417 44.991zm124.565 90.993l-49.8-49.8a84.6 84.6 0 01-42.684 13.273q-1.535.062-3.072.061a84.435 84.435 0 01-58.11-23.085 86.456 86.456 0 01-14.228-108.342l-54.669-54.67a371.312 371.312 0 00-81.581 98.536c20.031 34.646 95.613 150.434 210.256 150.434a191.093 191.093 0 0093.888-26.407z",
    width: "512",
  },
  /* CIRCULAR */
  "check-circular": {
    d: "M240.695 351.007l159.15-159.129a21.466 21.466 0 00.254-30.356q-.127-.129-.254-.254a21.465 21.465 0 00-30.358-.254c-.085.083-.169.168-.253.254L226.012 305.65l-84.467-83.161a19.986 19.986 0 00-28.24-1.148q-.6.55-1.147 1.148a21.465 21.465 0 00-.254 30.356q.125.129.254.254l97.93 97.93a22.584 22.584 0 0014.683 6.118 23.267 23.267 0 0015.924-6.14zM256 512C114.842 512 0 397.158 0 256S114.842 0 256 0s256 114.842 256 256-114.841 256-256 256zm0-482.778C130.955 29.222 29.222 130.953 29.222 256S130.955 482.778 256 482.778 482.778 381.046 482.778 256 381.045 29.222 256 29.222z",
    width: "512",
  },
  "help-circular": {
    d: "M257 512.998c-141.158 0-256-114.842-256-256s114.842-256 256-256 256 114.842 256 256-114.841 256-256 256zm0-482.778c-125.045 0-226.778 101.731-226.778 226.778S131.955 483.778 257 483.778s226.779-101.732 226.779-226.78S382.044 30.222 257 30.222zm92.044 178.629c0-45.358-47.05-79.765-91.128-79.765-42.086 0-69.119 17.508-90.342 48.672a10.8 10.8 0 002.375 14.7l24.992 18.952a10.788 10.788 0 0014.97-1.908c13.518-17.06 23.134-26.921 43.963-26.921 15.976 0 35.736 10.283 35.736 25.774 0 11.712-9.668 17.727-25.442 26.57-18.4 10.313-42.738 23.149-42.738 55.257v7.778a10.779 10.779 0 0010.779 10.779h41a10.78 10.78 0 0010.779-10.779v-5.69c.004-22.26 65.056-23.187 65.056-83.417zm-58.606 150.189a37.727 37.727 0 10-37.728 37.727 37.769 37.769 0 0037.728-37.725z",
    width: "512",
  },
  "warning-circular": {
    d: "M256 512C114.842 512 0 397.158 0 256S114.842 0 256 0s256 114.842 256 256-114.841 256-256 256zm0-482.778C130.955 29.222 29.222 130.953 29.222 256S130.955 482.778 256 482.778 482.778 381.046 482.778 256 381.045 29.222 256 29.222zm.567 359.2a36.268 36.268 0 1125.311-61.58 36.722 36.722 0 0110.484 25.539 35.566 35.566 0 01-10.484 25.311 34.882 34.882 0 01-25.311 10.734zm24.858-108.533a13.9 13.9 0 01-15.735 15.055h-18.536a14.126 14.126 0 01-15.735-15.055l-6.838-133.4c0-10.483 4.551-15.735 15.055-15.735h33.983c10.482 0 15.282 5.251 15.055 15.735z",
    width: "512",
  },
  /* ARROW */
  "arrow-left": {
    d: "M217.183,9.865-22.8,229.311v.144a36.233,36.233,0,0,0-2.5,51.181q1.188,1.31,2.5,2.5v.152l239.98,219.42a36.569,36.569,0,0,0,49.356-53.974L96.067,292.87H513.878a36.576,36.576,0,0,0,0-73.152H96.078L266.538,63.865a36.579,36.579,0,0,0-49.356-54Z",
    width: "585",
  },
  "arrow-right": {
    d: "M280.033 60.723a36.584 36.584 0 0 0 0 52.245l104.49 104.49H37.616A37.46 37.46 0 0 0 0 255.074c0 20.9 16.718 39.706 37.616 39.706h346.906l-104.49 104.49a36.943 36.943 0 1 0 52.246 52.243l169.273-169.272C507.82 275.972 512 265.523 512 257.164s-4.18-18.808-10.449-25.078L332.278 62.813c-16.719-16.718-39.707-16.718-52.245-2.09z",
    width: "512",
  },
  "arrow-top-right": {
    d: "M97.023 50.207c0 25.533 22.7 48.229 48.229 48.229h198.592L17.592 424.687a49.664 49.664 0 000 70.924c19.859 19.859 51.066 22.7 70.924 2.837l326.253-326.252v195.752c0 25.533 22.7 48.229 48.229 48.229s48.225-22.699 48.225-48.229V50.207a46.981 46.981 0 00-14.185-34.044 46.981 46.981 0 00-34.041-14.185H145.256c-28.37 0-48.233 22.7-48.233 48.229z",
    width: "512",
  },
  "arrow-down": {
    d: "M451.763 280.033a36.584 36.584 0 00-52.245 0l-104.49 104.49V37.616A37.46 37.46 0 00257.412 0c-20.9 0-39.706 16.718-39.706 37.616v346.906l-104.49-104.49a36.943 36.943 0 10-52.243 52.246l169.272 169.273C236.514 507.82 246.963 512 255.323 512s18.808-4.18 25.078-10.449l169.272-169.273c16.718-16.719 16.718-39.707 2.09-52.245z",
    width: "512",
  },
  "angle-left": {
    d: "M106 256.001a44.671 44.671 0 0113.126-31.754q1.037-1.036 2.123-1.991L330.378 13.127a44.812 44.812 0 0163.376 0 44.815 44.815 0 010 63.376l-179.5 179.5 179.5 179.5a44.813 44.813 0 010 63.376 44.814 44.814 0 01-63.375 0l-209.13-209.13q-1.085-.954-2.122-1.991a44.673 44.673 0 01-13.126-31.688z",
    width: "512",
  },
  "angle-right": {
    d: "M119.126 435.5L298.624 256 119.126 76.5a44.813 44.813 0 0163.375-63.376l209.13 209.13q1.085.955 2.122 1.991a44.972 44.972 0 010 63.507q-1.037 1.037-2.123 1.992L182.501 498.875a44.813 44.813 0 01-63.375-63.375z",
    width: "512",
  },
  "angle-top": {
    d: "M255.999 106a44.671 44.671 0 0131.754 13.126q1.036 1.037 1.991 2.123l209.129 209.129a44.812 44.812 0 010 63.376 44.815 44.815 0 01-63.376 0l-179.5-179.5-179.5 179.5a44.813 44.813 0 01-63.376 0 44.814 44.814 0 010-63.375l209.13-209.13q.954-1.085 1.991-2.122a44.673 44.673 0 0131.688-13.126z",
    width: "512",
  },
  "angle-down": {
    d: "M256 406.879a44.671 44.671 0 01-31.754-13.126q-1.036-1.037-1.991-2.123L13.126 182.501a44.812 44.812 0 010-63.376 44.815 44.815 0 0163.376 0l179.5 179.5 179.5-179.5a44.813 44.813 0 0163.376 0 44.814 44.814 0 010 63.375l-209.13 209.13q-.954 1.085-1.991 2.122a44.673 44.673 0 01-31.688 13.126z",
    width: "512",
  },
  /* CALENDAR */
  calendar: {
    d: "M415.379 68.943V30.118C415.379 13.133 400.816 1 386.261 1s-31.545 12.133-31.545 29.118v38.825zm0 0v38.825c0 16.986-14.559 29.118-29.118 29.118s-31.545-12.133-31.545-29.118V68.943H175.152v38.825c0 16.986-14.559 29.118-29.118 29.118s-31.546-12.133-31.546-29.118V68.943h-12.133c-46.1 0-87.355 38.825-87.355 87.355v269.345a86.992 86.992 0 0 0 86.627 87.355h308.9a86.992 86.992 0 0 0 87.355-86.628V156.298c2.426-46.104-36.399-84.928-82.503-87.355zm46.1 356.7c0 26.692-21.839 50.957-50.957 50.957H102.355c-26.691 0-50.955-21.837-50.955-50.957V180.564h410.083zM175.152 30.118C175.152 13.133 160.588 1 143.606 1s-29.118 12.133-29.118 29.118v38.825h60.664z",
    width: "512",
  },
  star: {
    group: (
      <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z" />
    ),
    width: "25",
    height: "25",
  },
  plus: {
    d: "M243.707,244.123l-223.723,0a7.528,7.528,0,0,0-5.392,2.5,7.4,7.4,0,0,0-2.5,5.393L12.066,285a7.53,7.53,0,0,0,2.525,5.369,7.507,7.507,0,0,0,5.369,2.523H243.687V516.612a8.748,8.748,0,0,0,7.893,7.894l33.02-.022a8.7,8.7,0,0,0,7.871-7.872V292.886H516.2a8.746,8.746,0,0,0,7.893-7.893l-.046-33a7.525,7.525,0,0,0-2.455-5.347,7.4,7.4,0,0,0-5.391-2.5l-223.747-.027,0-223.723a7.528,7.528,0,0,0-2.5-5.392,7.4,7.4,0,0,0-5.392-2.5H251.6a7.526,7.526,0,0,0-5.392,2.5,7.4,7.4,0,0,0-2.5,5.392Z",
    width: "512",
  },
  less: {
    d: "M20.954,276.955a20.954,20.954,0,0,1,0-41.908H491.046a20.954,20.954,0,0,1,0,41.908Z",
    width: "512",
  },
  "calendar-plus": {
    d: "M415.379 68.943V30.118C415.379 13.133 400.816 1 386.261 1s-31.545 12.133-31.545 29.118v38.825zm0 0v38.825c0 16.986-14.559 29.118-29.118 29.118s-31.545-12.133-31.545-29.118V68.943H175.152v38.825c0 16.986-14.559 29.118-29.118 29.118s-31.546-12.133-31.546-29.118V68.943h-12.133c-46.1 0-87.355 38.825-87.355 87.355v269.345a86.992 86.992 0 0 0 86.627 87.355h308.9a86.992 86.992 0 0 0 87.355-86.628V156.298c2.426-46.104-36.399-84.928-82.503-87.355zm46.1 356.7c0 26.692-21.839 50.957-50.957 50.957H102.355c-26.691 0-50.955-21.837-50.955-50.957V180.564h410.083zM175.152 30.118C175.152 13.133 160.588 1 143.606 1s-29.118 12.133-29.118 29.118v38.825h60.664zm79.6 281.8h-58.9a11.234 11.234 0 0 0-11 11 10.738 10.738 0 0 0 10.469 11q.265.006.531 0h58.119v58.123a11.234 11.234 0 0 0 11 11 10.739 10.739 0 0 0 11-10.47v-59.44h58.908a11 11 0 0 0 0-21.992h-58.127V253.02a11.234 11.234 0 0 0-11-11 10.737 10.737 0 0 0-11 10.468q-.006.266 0 .531z",
    width: "512",
  },
  /* COMMUNICATION */
  email: {
    d: "M491.437,438.565H20.563A20.586,20.586,0,0,1,0,418V94A20.585,20.585,0,0,1,20.563,73.435H491.437A20.585,20.585,0,0,1,512,94V418A20.586,20.586,0,0,1,491.437,438.565ZM60.979,402.844H451.158L331.447,283.132l-37.591,37.591a50.848,50.848,0,0,1-71.827,0l-39.464-39.465ZM35.721,134.415v243.17L157.306,256ZM356.7,257.874,476.279,377.448V138.3ZM60.979,109.156,247.287,295.464a15.071,15.071,0,0,0,21.311,0L454.906,109.156Z",
    width: "512",
  },
  phone: {
    d: "M358.358,511.85c-18.462,0-38.246-2.693-59.03-8.14-61.948-16.234-126.242-55.353-181.039-110.149S24.374,274.47,8.14,212.522C-8.979,147.2,1.1,91.72,36.522,56.3L76.253,16.567C97.817-5,132.534-5.366,153.644,15.743l67.383,67.384c21.11,21.109,20.74,55.827-.823,77.39L182.071,198.65,313.5,330.079l38.132-38.133a55.589,55.589,0,0,1,38.584-16.438,53.192,53.192,0,0,1,38.807,15.614l67.383,67.384c21.11,21.109,20.74,55.827-.823,77.39l-.1.1L455.5,475.376C431.356,499.5,397.9,511.849,358.358,511.85ZM115.706,35.845a20.131,20.131,0,0,0-14.2,5.979L61.779,81.555C35.7,107.633,28.922,150.929,42.691,203.468,57.344,259.38,93.162,317.92,143.546,368.3s108.924,86.2,164.837,100.855c52.539,13.769,95.834,6.991,121.912-19.087l.1-.1L470.37,410.6c7.6-7.639,7.949-19.664.78-26.834l-67.383-67.383a17.753,17.753,0,0,0-12.987-5.157,20.048,20.048,0,0,0-13.891,5.981l-50.761,50.76a17.859,17.859,0,0,1-25.257,0L144.186,211.278a17.859,17.859,0,0,1,0-25.256l50.761-50.761c7.637-7.637,8.007-19.695.824-26.878L128.387,41A17.785,17.785,0,0,0,115.706,35.845Z",
    width: "512",
  },
  /* USER */
  user: {
    d: "M487.121,512a17.846,17.846,0,0,1-17.846-17.846c0-117.6-95.675-213.275-213.275-213.275S42.725,376.553,42.725,494.154a17.847,17.847,0,0,1-35.693,0c0-110.243,72.029-203.981,171.492-236.629a140.434,140.434,0,0,1-62.963-117.086C115.561,63,178.561,0,256,0S396.439,63,396.439,140.439a140.434,140.434,0,0,1-62.963,117.086c99.463,32.648,171.492,126.386,171.492,236.629A17.847,17.847,0,0,1,487.121,512ZM256,35.692A104.747,104.747,0,1,0,360.747,140.439,104.866,104.866,0,0,0,256,35.692Z",
    width: "512",
  },
  emission: {
    group: (
      <>
        <path d="M163.2432,364.1158h72.8312A19.9256,19.9256,0,0,1,256,384.0414v2.2715a19.9255,19.9255,0,0,1-19.9255,19.9255H163.2432a19.9256,19.9256,0,0,1-19.9256-19.9256v-2.2715A19.9255,19.9255,0,0,1,163.2432,364.1158Z" />
        <path d="M264.002,168.1473a18.4748,18.4748,0,0,0-18.4537,18.4541v20.6025a18.4539,18.4539,0,1,0,36.9078,0V186.6014A18.4748,18.4748,0,0,0,264.002,168.1473Z" />
        <path d="M408.5258,255.4978a3.7841,3.7841,0,0,1-3.1125-5.9224,91.9393,91.9393,0,0,0,15.6361-51.4343v0A92.3794,92.3794,0,0,0,328.67,105.7614H160.8309a92.38,92.38,0,0,0-92.3794,92.38v0a92.38,92.38,0,0,0,92.38,92.38h66.4562a7.8377,7.8377,0,0,1,7.6919,6.4319l.0307.1617a7.7976,7.7976,0,0,1-7.6932,9.2146H216.3707a23.3266,23.3266,0,1,0,0,46.6531h56.76a23.3265,23.3265,0,0,0,23.3265-23.3266v0l0-.1319a3.987,3.987,0,0,1,3.9762-3.98H408.5256a35.0229,35.0229,0,0,0,35.0229-35.0228v0A35.0226,35.0226,0,0,0,408.5258,255.4978ZM210.4492,232.7889a35.8464,35.8464,0,0,1-27.5478,12.8691h-5.0689a35.9605,35.9605,0,0,1-35.92-35.92V184.0662a35.96,35.96,0,0,1,35.92-35.9189h5.0689a35.6786,35.6786,0,0,1,25.3994,10.5215,10,10,0,1,1-14.1436,14.1406,15.81,15.81,0,0,0-11.2558-4.6621h-5.0689a15.9377,15.9377,0,0,0-15.92,15.9189v25.6719a15.9379,15.9379,0,0,0,15.92,15.92h5.0689a15.8953,15.8953,0,0,0,12.2138-5.709,10,10,0,0,1,15.334,12.84Zm92.0069-25.585a38.4539,38.4539,0,1,1-76.9078,0V186.6014a38.4539,38.4539,0,1,1,76.9078,0Zm56.6308,55.585a10,10,0,0,1,0,20H326.1875a10,10,0,0,1-7.7461-16.3242l28.3-34.6592q.1949-.2388.4043-.4658a7.3,7.3,0,0,0-5.3584-12.2578h-2.0586a7.3086,7.3086,0,0,0-7.3008,7.3v2.2031a10,10,0,1,1-20,0v-2.2031a27.3315,27.3315,0,0,1,27.3008-27.3h2.0586A27.3006,27.3006,0,0,1,362.06,244.6668l-14.7969,18.1221Z" />
      </>
    ),
    width: "512",
  },
  close: {
    d: "M483.338,512a28.578,28.578,0,0,1-20.268-8.395L256,296.534,48.929,503.605A28.662,28.662,0,0,1,8.4,463.07L215.465,256,8.4,48.929A28.662,28.662,0,0,1,48.929,8.4L256,215.466,463.07,8.4a28.663,28.663,0,0,1,40.536,40.534L296.535,256,503.606,463.07A28.662,28.662,0,0,1,483.338,512Z",
    width: "512",
  },
  filter: {
    d: "M16 144.202h142.514a63.881 63.881 0 0 0 77.618 46.228 63.88 63.88 0 0 0 46.228-46.228H496a16 16 0 0 0 16-16 16 16 0 0 0-16-16H282.361a63.881 63.881 0 0 0-77.617-46.229 63.882 63.882 0 0 0-46.229 46.229H16a16 16 0 0 0-16 16 16 16 0 0 0 16 16zm204.438-48.188a32.188 32.188 0 0 1 32.188 32.188 32.188 32.188 0 0 1-32.188 32.187 32.188 32.188 0 0 1-32.188-32.187 32.222 32.222 0 0 1 32.188-32.188zM496 240.202h-34.264a63.881 63.881 0 0 0-123.846 0H16a16 16 0 0 0-16 16 16 16 0 0 0 16 16h321.889a63.881 63.881 0 0 0 123.846 0H496a16 16 0 0 0 0-32zm-96.188 48.187A32.188 32.188 0 1 1 432 256.201a32.222 32.222 0 0 1-32.187 32.188zM496 368.201H185.989a63.868 63.868 0 0 0-77.592-46.235 63.872 63.872 0 0 0-46.235 46.235h-46.16a16 16 0 0 0-16 16 16 16 0 0 0 16 16h46.16a63.869 63.869 0 0 0 77.593 46.234 63.866 63.866 0 0 0 46.234-46.233H496a16 16 0 0 0 0-32zm-371.917 48.188a32.189 32.189 0 0 1-32.209-32.167 32.188 32.188 0 0 1 32.167-32.209 32.187 32.187 0 0 1 32.209 32.167v.022a32.222 32.222 0 0 1-32.167 32.187z",
    width: "512",
  },
  hamburger: {
    d: "M482.056 136.235H30.292A30.119 30.119 0 0 1 .348 105.942a30.118 30.118 0 0 1 29.944-29.944h451.764A30.118 30.118 0 0 1 512 106.289a30.118 30.118 0 0 1-29.944 29.946zm0 150.588H30.292A30.119 30.119 0 0 1 .001 256.879a30.119 30.119 0 0 1 29.944-30.291h452.111a30.118 30.118 0 0 1 .347 60.235zm0 150.588H30.292A30.119 30.119 0 0 1 .001 407.467a30.119 30.119 0 0 1 29.944-30.291h452.111a30.118 30.118 0 0 1 .347 60.235h-.347z",
    width: "512",
  },
  search: {
    d: "M494.139,512a17.8,17.8,0,0,1-12.629-5.231L333.777,359.035a202.387,202.387,0,0,1-130.5,47.529C91.192,406.564,0,315.372,0,203.282S91.192,0,203.281,0,406.564,91.192,406.564,203.282a202.379,202.379,0,0,1-47.529,130.494L506.768,481.51A17.86,17.86,0,0,1,494.139,512ZM203.281,35.721c-92.393,0-167.56,75.168-167.56,167.561s75.167,167.561,167.56,167.561,167.562-75.167,167.562-167.561S295.675,35.721,203.281,35.721Z",
    width: "512",
  },
  euro: {
    d: "M407.883 121.406l42.32-86.721Q382.214 0 323.938 0 241.38 0 186.572 52.726q-52.033 48.564-68.683 132.51H82.507L61 235.187h50.645q-.694 1.388-.694 11.1v18.038h-27.75l-21.507 49.951h53.42q14.569 90.884 63.133 141.53 53.42 56.2 140.835 56.2 60.358 0 106.84-27.057l.694-104.759q-54.808 43.707-106.84 43.707-80.477 0-102.678-109.615h120.715l21.507-49.951H211.547l.694-29.138h155.4l21.514-49.957H219.873Q244.155 90.19 317 90.19q42.32 0 90.883 31.216z",
    width: "512",
  },
  linkedin: {
    d: "M0,0V512H512V0ZM125.568,100.651c20.281.228,40.249,14.222,41.131,38.443.427,21.532-18.332,37.945-41.657,38.443h-.569c-20.082-.228-39.68-14.578-40.59-38.443.284-21.291,18.19-37.931,41.685-38.443Zm217.557,101.76c22.3.142,43.335,6.756,60.629,24.377,17.963,20.039,23.737,47.659,24.377,75.748V430.279H354.5V311.225c-.171-22.315-7.808-49.436-37.348-50.347-17.308.185-29.511,10.24-37.874,27.065-2.276,5.419-2.617,11.634-2.716,17.849v124.5h-73.6c.284-62.236.668-124.473.526-186.724q0-26.517-.526-35.712h73.6v31.374c6.244-8.889,13.17-17.308,22.471-24.092,12.6-9,27.748-12.444,44.089-12.715Zm-254.9,5.433h73.6V430.279H88.22V207.844Z",
    width: "512",
  },
  twitter: {
    d: "M163.836,422.341c193.195,0,298.906-160.239,298.906-298.923,0-4.506,0-9.011-.2-13.517A214.015,214.015,0,0,0,515,55.357,212.923,212.923,0,0,1,454.584,71.98a105.694,105.694,0,0,0,46.285-58.2,208.981,208.981,0,0,1-66.816,25.429,105.046,105.046,0,0,0-181.692,71.9,116.071,116.071,0,0,0,2.662,23.962A298.342,298.342,0,0,1,38.447,25.251,105.353,105.353,0,0,0,71.028,165.59,106.257,106.257,0,0,1,23.48,152.483v1.434A105.3,105.3,0,0,0,107.7,256.982a102.432,102.432,0,0,1-27.648,3.686,103.653,103.653,0,0,1-19.712-1.843,105.062,105.062,0,0,0,98.15,72.96A210.7,210.7,0,0,1,27.986,376.842,202.084,202.084,0,0,1,3,375.408a298.854,298.854,0,0,0,160.853,46.916",
    width: "512",
  },
  youtube: {
    d: "M206.128,253.977V110.1L344.436,182.3l-138.308,71.68ZM509.88,85.2S504.9,49.894,489.519,34.363c-19.456-20.378-41.3-20.48-51.3-21.675C366.588,7.5,259.1,7.5,259.1,7.5h-.2s-107.469,0-179.115,5.171c-10.018,1.212-31.829,1.28-51.3,21.675C13.121,49.877,8.12,85.188,8.12,85.188S3,126.625,3,168.063v38.844c0,41.421,5.12,82.876,5.12,82.876S13.1,325.06,28.481,340.607c19.456,20.412,45.056,19.746,56.457,21.88,40.96,3.908,174.08,5.12,174.08,5.12s107.605-.154,179.234-5.325c10.018-1.212,31.846-1.28,51.3-21.675,15.36-15.531,20.361-50.825,20.361-50.825s5.12-41.455,5.12-82.876V168.063c0-41.455-5.12-82.876-5.12-82.876Z",
    width: "512",
  },
  instagram: {
    d: "M380.593,0H131.405C58.948,0,0,58.949,0,131.407V380.595C0,453.052,58.948,512,131.405,512H380.593C453.051,512,512,453.052,512,380.595V131.407C512,58.949,453.051,0,380.593,0m95.686,380.595a95.794,95.794,0,0,1-95.686,95.684H131.405a95.794,95.794,0,0,1-95.684-95.684V131.407a95.794,95.794,0,0,1,95.684-95.686H380.593a95.794,95.794,0,0,1,95.686,95.686ZM256,134.389A121.611,121.611,0,1,0,377.611,256,121.749,121.749,0,0,0,256,134.389m0,207.5A85.89,85.89,0,1,1,341.89,256,85.987,85.987,0,0,1,256,341.891M414.273,128.557A29.593,29.593,0,1,1,384.68,98.965a29.593,29.593,0,0,1,29.594,29.592",
    width: "512",
  },
  facebook: {
    d: "M284.036.107,214.044,0C135.411,0,84.595,49.457,84.595,126v58.1H14.221A10.735,10.735,0,0,0,3.215,194.545V278.72c0,5.769,4.93,10.44,11.006,10.44H84.595v212.4A10.73,10.73,0,0,0,95.6,512h91.817c6.081,0,11.006-4.677,11.006-10.44V289.16h82.283a10.73,10.73,0,0,0,11.005-10.44l.034-84.175a10.191,10.191,0,0,0-3.223-7.383,11.316,11.316,0,0,0-7.788-3.063H198.423V134.851c0-23.671,5.946-35.688,38.452-35.688l47.15-.016a10.732,10.732,0,0,0,11-10.44V10.546C295.025,4.789,290.106.117,284.036.107Z",
    width: "512",
  },
  "404": {
    width: "512",
    group: (
      <>
        <path d="m485.884 54.027h-151.395c-12.094-31.554-42.706-54.027-78.489-54.027-35.795 0-66.417 22.473-78.515 54.027h-151.369c-14.4 0-26.116 11.709-26.116 26.101v294.4c0 14.392 11.716 26.101 26.116 26.101h145.555l-20.145 40.802h-16.398c-19.47 0-35.309 15.829-35.309 35.285v25.284c0 5.523 4.477 10 10 10h292.363c5.522 0 10-4.477 10-10v-25.285c0-19.456-15.84-35.285-35.31-35.285h-16.402l-20.164-40.802h145.577c14.4 0 26.116-11.708 26.116-26.101v-294.4c.001-14.391-11.715-26.1-26.115-26.1zm-229.884-34.027c35.305 0 64.027 28.69 64.027 63.955 0 35.28-28.723 63.983-64.027 63.983-35.32 0-64.055-28.703-64.055-63.983 0-35.265 28.735-63.955 64.055-63.955zm136.182 456.715v15.285h-272.363v-15.285c0-8.428 6.868-15.285 15.309-15.285h241.744c8.441.001 15.31 6.857 15.31 15.285zm-54.021-35.284h-164.33l20.145-40.802h124.021zm147.723-60.802h-459.768c-3.373 0-6.116-2.737-6.116-6.101v-21.833h191.056c5.523 0 10-4.477 10-10s-4.477-10-10-10h-191.056v-252.567c0-3.364 2.744-6.101 6.116-6.101h146.436c-.386 3.258-.608 6.567-.608 9.927 0 46.308 37.707 83.983 84.055 83.983 46.333 0 84.027-37.675 84.027-83.983 0-3.361-.221-6.669-.608-9.927h146.464c3.315 0 6.116 2.793 6.116 6.101v252.568h-191.054c-5.522 0-10 4.477-10 10s4.478 10 10 10h191.056v21.833c0 3.363-2.744 6.1-6.116 6.1z" />
        <path d="m192.33 258.345h-2.653c.143-24.164.224-50.465-.066-54.062-.635-7.436-5.076-13.486-11.312-15.414-6.172-1.911-12.774.525-17.67 6.521-5.724 7.029-33.958 57.979-39.559 68.122-1.711 3.098-1.657 6.869.141 9.917s5.074 4.918 8.612 4.918h39.72c-.049 6.82-.101 13.371-.151 19.252-.047 5.523 4.392 10.038 9.914 10.085h.087c5.482 0 9.951-4.421 9.998-9.915.031-3.572.089-10.664.153-19.423h2.786c5.523 0 10-4.477 10-10s-4.477-10.001-10-10.001zm-22.657 0h-22.854c8.735-15.628 17.305-30.67 22.99-40.254.013 9.994-.046 24.849-.136 40.254z" />
        <path d="m292.785 225.882c0-20.753-16.896-37.637-37.665-37.637-20.753 0-37.636 16.884-37.636 37.637v44.191c0 20.738 16.883 37.609 37.636 37.609 20.768 0 37.665-16.871 37.665-37.609zm-20 44.192c0 9.709-7.924 17.609-17.665 17.609-9.725 0-17.636-7.899-17.636-17.609v-44.191c0-9.725 7.912-17.637 17.636-17.637 9.741 0 17.665 7.912 17.665 17.637z" />
        <path d="m319.643 278.345h39.726c-.052 6.82-.104 13.37-.157 19.25-.049 5.522 4.389 10.039 9.911 10.088h.091c5.481 0 9.949-4.419 9.998-9.912.031-3.572.093-10.667.158-19.426h2.809c5.522 0 10-4.477 10-10s-4.478-10-10-10h-2.671c.147-24.17.229-50.479-.076-54.062-.635-7.436-5.075-13.486-11.312-15.414-6.168-1.909-12.773.526-17.67 6.521-5.725 7.029-33.958 57.979-39.56 68.122-1.711 3.098-1.657 6.869.142 9.917 1.796 3.046 5.072 4.916 8.611 4.916zm39.998-60.274c.016 9.99-.045 24.856-.138 40.273h-22.864c8.742-15.64 17.316-30.69 23.002-40.273z" />
        <path d="m256 85.961c5.522 0 10-4.477 10-10v-24.718c0-5.523-4.478-10-10-10-5.523 0-10 4.477-10 10v24.718c0 5.523 4.477 10 10 10z" />
        <path d="m256 126.666c5.522 0 10-4.477 10-10v-.057c0-5.523-4.478-9.972-10-9.972-5.523 0-10 4.505-10 10.028s4.477 10.001 10 10.001z" />
        <path d="m256 332.696c-5.523 0-10 4.477-10 10s4.477 10 10 10h.057c5.522 0 9.972-4.477 9.972-10s-4.507-10-10.029-10z" />
      </>
    ),
  },
  loader: {
    width: "512",
    group: (
      <>
        <ellipse
          cx="37"
          cy="36.5"
          rx="37"
          ry="36.5"
          transform="translate(727 235)"
        />
        <ellipse
          cx="37"
          cy="36.5"
          rx="37"
          ry="36.5"
          transform="translate(727 674)"
          opacity=".4"
        />
        <ellipse
          cx="37"
          cy="36.5"
          rx="37"
          ry="36.5"
          transform="rotate(90 283 737)"
          opacity=".7"
        />
        <ellipse
          cx="37"
          cy="36.5"
          rx="37"
          ry="36.5"
          transform="rotate(90 63.5 517.5)"
          opacity=".1"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(-30 1657.72 -1203.33)"
          opacity=".5"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(60 196.77 1003.472)"
          opacity=".8"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(60 -183.292 784.043)"
          opacity=".2"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(-60 603.806 -256.467)"
          opacity=".05"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(-60 983.867 -475.895)"
          opacity=".6"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(30 -38.243 1730.9)"
          opacity=".9"
        />
        <circle
          cx="36.571"
          cy="36.571"
          r="36.571"
          transform="rotate(30 -857.16 1511.47)"
          opacity=".3"
        />
      </>
    ),
  },
};

export const availableIcons = Object.keys(icons);

export default icons;
