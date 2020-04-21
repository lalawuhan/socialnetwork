import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
/* css reset snippet from https://bitsofco.de/my-css-reset-base/ */
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
a,
p,
span,
em,
small,
strong,
sub,
sup,
mark,
del,
ins,
strike,
abbr,
dfn,
blockquote,
q,
cite,
code,
pre,
ol,
ul,
li,
dl,
dt,
dd,
div,
section,
article,
main,
aside,
nav,
header,
hgroup,
footer,
img,
figure,
figcaption,
address,
time,
audio,
video,
canvas,
iframe,
details,
summary,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
    margin: 0;
    padding: 0;
    border: 0;
}

body {
    overflow-x:hidden;    
    font-family: Lato, "Lucida Grande", Tahoma, Sans-Serif;
    font-size: 1.2em;
    line-height: 1.625
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
         a{    
        text-decoration: none;
       

    }
}
* {
  font-family:inherit;
}

body.light-mode {
    background: #fff;
    color: #333;
    transition: background-color 0.8s ease;
        .find-links {
            color: #ff6ee2;
    }
    a{
      color: #ff6ee2;
    }
    .avatar-row-top {
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e31c8e' fill-opacity='0.91'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");  }
  .avatar-row-bottom {
    background-color:  #db37ba; 
  }
    
}
body.dark-mode {
   background: #1a1919;
    color: #dcdcdc;
    transition: background-color 0.8s ease;
        .find-links {
            color: #ff6ee2;
    }
    a{
                  color: #ff6ee2;

    }
      .avatar-row-top {
    background-color: #1a1919;
background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffe3f1' fill-opacity='0.91'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .avatar-row-bottom {
    background-color: #d45182;
  }

}`;
