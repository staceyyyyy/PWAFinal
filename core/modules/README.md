# Module Structure Standardization
We standardize module structure to contains folders and files like listed below. The folders / files could not always be there, depending on the need. For example, if the module does not have models, then we do not need put the models folder there

### components
This folder contains all common components that might be used in some pages.

### plugins
This folder contains all plugins of the module. Plugin is such a common component that is proposed to be used / imported in other modules.
Ideally, each plugin provides the documentation in README.md to help other developers understand the workflow.

### pages
This folder contains all files related to a page. A page folder contains the following files/folders:
* **index.js (required)**
This is the main page component (the main component) that is called / imported in the routing file. Hence pre-rendering (getInitialProps, getServerSideProps, getStaticProps) can be done here (including specifying translation namespace).
> **Note: Remember! Pre-rendering functions in NextJS work only in the page component (main component / first component).**
* **components**
This folder contains all components related to the current page
* **core.js (required)**
This is the core file of the page component. This file commonly accepts the required props based on the needs of the module. Each module could have different props. Commonly the props could be the children component, the data, etc.
* **README.md**
Ideally, each page provides the documentation in README.md to help other developers understand the workflow.

### models 
This folder contains all logical codes. We separate the logical layer with the view layer. Therefore, it is recommended to avoid any logical code in template.

### helpers 
This folder contains all helpers. For reusable reasons, if a common function might need to be used in several places, that function should be written once as a helper.

### services
This folder contains files related to api requests. It contains a graphql folder for graphql requests and a rest folder if there are any rest API requests.

### locales
This folder contains the json files for translation. They won’t work automatically after installation. Manual installation is required. We must copy the json files here into the public/static/locales folder manually.

### index.js
This is the file which exports all of the module files so we can import the core files in our custom module with a destructuring approach. 
> **Note: However, this is not recommended because importing components with a destructuring way will include unused files in the bundle js when building the app. That could cause a huge js which impacts on the performance.**

### README.md
Every module requires me to write the documentation here. The documentation must contain at least these 3 sections:
* **Description**
It describes as detail as possible the module functionality for and how it works.
* **How to Install**
It describes how to install or how to use this module
* **Component**
It describes the component such as the required props. If a module has many components or plugin components, this section must provide links to the README.md which are located in each plugin or page folder.

> **Note: it is recommended to not edit the core codes directly. By keeping the core code clean, it will make it possible in the future if we want to upgrade the version of the core modules. If you need to do customization, do it by overriding them in folder src/custom.**


# Module Installation
Installing module is done manually by these steps:
1. Copy the translation json file from `[module name]/locales/[language id]` folder into `public/static/locales/[language id]` folder.
2. Define the routing file under pages folder. Import the page component from `src/core/[module name]/pages/[page name]/index.js`.

# How to Overriding a Module
To customize the module, **don’t adjust it directly in the core modules**. The correct way is overriding them. This way, the core code is clean so when upgrading the module your custom code won’t lose. 
The main rule of the overriding is to use the same folder structure that is used in the core modules.
Here are the steps of how to overriding the core module:
1. Create a custom module in **src/custom** folder. If possible, use the same name with the core module so we know that the purpose of our custom module is to override the same module name in the core folder.
2. Create `src/custom/[custom module]/pages/[page name]/index.js`. This file acts as a page component that will override the `src/core/[module name]/pages/[page name]/index.js`.
3. Change the page routing in pages folder to import this new page component like so: 
```
import Page from './src/custom/[module_name]/views/pages/[page_name].js;
export default Page
```
4. If there are any other files such as components, models or even services that need to be overridden, we can create the custom files with the same folder structure. Then import those custom files in the custom page component or in the appropriate component (depends on where the component/file is imported originally in core module). 
