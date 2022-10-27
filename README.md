# Remote Employees ( re-strapi )

## The project uses such technologies as:

* React
* TypeScript
* Scss
* Strapi
## A brief overview:

* Styles are written using modules;
* The directory must have: (example.tsx, example.module.scss, index.js);
* A separate directory with a root index file is created for each component, for short import into individual components;
* Global styles are described in the "global styles" directory to access them from any part of the application;
* Dimensions are measured using: rem, em, %, px;
* The clamp function is used for smooth scaling of fonts;
* Folder "context" has the global context of the entire application
* In the folder "utils" stored mixins

## Adding files to the server requires a file - .htaccess

File contents:

<pre>
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule . /index.html [L]
  </IfModule>
</pre>
