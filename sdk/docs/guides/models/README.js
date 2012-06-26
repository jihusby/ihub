Ext.data.JsonP.models({"guide":"<h1>Using Models</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/models-section-1'>Using Proxies</a></li>\n<li><a href='#!/guide/models-section-2'>Associations</a></li>\n<li><a href='#!/guide/models-section-3'>Validations</a></li>\n</ol>\n</div>\n\n<p>At its simplest a Model is just a set of fields and their data. We’re going to look at four of the principal parts of <code><a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a></code> — <a href=\"#!/api/Ext.data.Field\" rel=\"Ext.data.Field\" class=\"docClass\">Fields</a>, <a href=\"#!/api/Ext.data.proxy.Proxy\" rel=\"Ext.data.proxy.Proxy\" class=\"docClass\">Proxies</a>, <a href=\"#!/api/Ext.data.association.Association\" rel=\"Ext.data.association.Association\" class=\"docClass\">Associations</a> and <a href=\"#!/api/Ext.data.Validations\" rel=\"Ext.data.Validations\" class=\"docClass\">Validations</a>.</p>\n\n<p><p class='screenshot'><img src='guides/models/model.png' alt=''><span></span></p></p>\n\n<p>Let's look at how we create a model now:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('User', {\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n    config: {\n        fields: [\n            { name: 'id', type: 'int' },\n            { name: 'name', type: 'string' }\n        ]\n    }\n});\n</code></pre>\n\n<h2 id='models-section-1'>Using Proxies</h2>\n\n<p>Proxies are used by stores to handle the loading and saving of model data. There are two types of proxy: client and server. Examples of client proxies include Memory for storing data in the browser's memory and Local Storage which uses the HTML 5 local storage feature when available. Server proxies handle the marshaling of data to some remote server and examples include Ajax, JsonP, and Rest.</p>\n\n<p>Proxies can be defined directly on a model, like so:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('User', {\n\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n\n    config: {\n        fields: ['id', 'name', 'age', 'gender'],\n        proxy: {\n            type: 'rest',\n            url : 'data/users',\n            reader: {\n                type: 'json',\n                root: 'users'\n            }\n        }\n    }\n});\n\n// Uses the User Model's Proxy\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Ext.data.Store</a>', {\n    model: 'User'\n});\n</code></pre>\n\n<p>This helps in two ways. First, it's likely that every store that uses the User model will need to load its data the same way, so we avoid having to duplicate the proxy definition for each store. Second, we can now load and save model data without a store:</p>\n\n<pre><code>// Gives us a reference to the User class\nvar User = <a href=\"#!/api/Ext.data.ModelManager-method-getModel\" rel=\"Ext.data.ModelManager-method-getModel\" class=\"docClass\">Ext.ModelMgr.getModel</a>('User');\n\nvar ed = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('User', {\n    name: 'Ed Spencer',\n    age : 25\n});\n\n// We can save Ed directly without having to add him to a Store first because we\n// configured a RestProxy this will automatically send a POST request to the url /users\ned.save({\n    success: function(ed) {\n        console.log(\"Saved Ed! His ID is \"+ ed.getId());\n    }\n});\n\n// Load User 1 and do something with it (performs a GET request to /users/1)\nUser.load(1, {\n    success: function(user) {\n        console.log(\"Loaded user 1: \" + user.get('name'));\n    }\n});\n</code></pre>\n\n<p>There are also proxies that take advantage of the new capabilities of HTML5 - <a href=\"#/api/Ext.data.proxy.LocalStorage\">LocalStorage</a> and <a href=\"#/api/Ext.data.proxy.SessionStorage\">SessionStorage</a>. Although older browsers don't support these new HTML5 APIs, they're so useful that a lot of applications will benefit enormously by using them.</p>\n\n<p><a href=\"guides/data/examples/model_with_proxy/index.html\">Example of a Model that uses a Proxy directly</a></p>\n\n<h2 id='models-section-2'>Associations</h2>\n\n<p>Models can be linked together with the Associations API. Most applications deal with many different models, and the models are almost always related. A blog authoring application might have models for User, Post, and Comment. Each user creates posts and each post receives comments. We can express those relationships like so:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('User', {\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n    config: {\n        fields: ['id', 'name'],\n        proxy: {\n            type: 'rest',\n            url : 'data/users',\n            reader: {\n                type: 'json',\n                root: 'users'\n            }\n        },\n\n        hasMany: 'Post' // shorthand for { model: 'Post', name: 'posts' }\n    }\n});\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Post', {\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n\n    config: {\n        fields: ['id', 'user_id', 'title', 'body'],\n\n        proxy: {\n            type: 'rest',\n            url : 'data/posts',\n            reader: {\n                type: 'json',\n                root: 'posts'\n            }\n        },\n        belongsTo: 'User',\n        hasMany: { model: 'Comment', name: 'comments' }\n    }\n});\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Comment', {\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n\n    config: {\n        fields: ['id', 'post_id', 'name', 'message'],\n        belongsTo: 'Post'\n    }\n});\n</code></pre>\n\n<p>It's easy to express rich relationships between different models in your application. Each model can have any number of associations with other models and your models can be defined in any order. Once we have a model instance we can easily traverse the associated data. For example, to log all comments made on each post for a given user, do something like this:</p>\n\n<pre><code>// Loads User with ID 1 and related posts and comments using User's Proxy\nUser.load(1, {\n    success: function(user) {\n        console.log(\"User: \" + user.get('name'));\n\n        user.posts().each(function(post) {\n            console.log(\"Comments for post: \" + post.get('title'));\n\n            post.comments().each(function(comment) {\n                console.log(comment.get('message'));\n            });\n        });\n    }\n});\n</code></pre>\n\n<p>Each of the hasMany associations we created above adds a new function to the Model. We declared that each User model hasMany Posts, which added the <code>user.posts()</code> function we used in the snippet above. Calling <code>user.posts()</code> returns a <a href=\"#!/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Store</a> configured with the Post model. In turn, the Post model gets a <code>comments()</code> function because of the hasMany Comments association we set up.</p>\n\n<p>Associations aren't just helpful for loading data, they're useful for creating new records too:</p>\n\n<pre><code>user.posts().add({\n    title: 'Ext JS 4.0 MVC Architecture',\n    body: 'It\\'s a great Idea to structure your Ext JS Applications using the built in MVC Architecture...'\n});\n\nuser.posts().sync();\n</code></pre>\n\n<p>Here we instantiate a new Post, which is automatically given the User id in the user_id field. Calling <code>sync()</code> saves the new Post via its configured proxy. This, again, is an asynchronous operation to which you can pass a callback if you want to be notified when the operation completed.</p>\n\n<p>The belongsTo association also generates new methods on the model. Here's how to use that:</p>\n\n<pre><code>// get the user reference from the post's belongsTo association\npost.getUser(function(user) {\n    console.log('Just got the user reference from the post: ' + user.get('name'))\n});\n\n// try to change the post's user\npost.setUser(100, {\n    callback: function(product, operation) {\n        if (operation.wasSuccessful()) {\n            console.log('Post\\'s user was updated');\n        } else {\n            console.log('Post\\'s user could not be updated');\n        }\n    }\n});\n</code></pre>\n\n<p>Once more, the loading function (<code>getUser</code>) is asynchronous and requires a callback function to get at the user instance. The <code>setUser</code> method simply updates the foreign_key (<code>user_id</code> in this case) to 100 and saves the Post model. As usual, callbacks can be passed in that will be triggered when the save operation has completed, whether successfully or not.</p>\n\n<h2 id='models-section-3'>Validations</h2>\n\n<p>Sencha Touch 2 Models have rich support for validating their data. To demonstrate this we're going to build upon the example we created that illustrated associations. First, let's add some validations to the <code>User</code> model:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('User', {\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n\n    config: {\n        fields: ...,\n\n        validations: [\n            { type: 'presence', name: 'name' },\n            { type: 'length',   name: 'name', min: 5 },\n            { type: 'format',   name: 'age', matcher: /\\d+/ },\n            { type: 'inclusion', name: 'gender', list: ['male', 'female'] },\n            { type: 'exclusion', name: 'name', list: ['admin'] }\n        ],\n\n        proxy: ...\n    }\n});\n</code></pre>\n\n<p>Validations follow the same format as field definitions. In each case, we specify a field and a type of validation. The validations in our example are expecting the name field to be present and to be at least five characters in length, the age field to be a number, the gender field to be either \"male\" or \"female\", and the username to be anything but \"admin\". Some validations take additional optional configuration - for example the length validation can take min and max properties, format can take a matcher, etc. There are five validations built into Sencha Touch 2, and adding custom rules is easy. First, let's look at the ones built right in:</p>\n\n<ul>\n<li><code>presence</code> simply ensures that the field has a value. Zero counts as a valid value but empty strings do not.</li>\n<li><code>length</code> ensures that a string is between a minimum and maximum length. Both constraints are optional.</li>\n<li><code>format</code> ensures that a string matches a regular expression format. In the example above we ensure that the age field is four numbers followed by at least one letter.</li>\n<li><code>inclusion</code> ensures that a value is within a specific set of values (for example, ensuring gender is either male or female).</li>\n<li><code>exclusion</code> ensures that a value is not one of the specific set of values (for example, blacklisting usernames like 'admin').</li>\n</ul>\n\n\n<p>Now that we have a grasp of what the different validations do, let's try using them against a User instance. We'll create a user and run the validations against it, noting any failures:</p>\n\n<pre><code>// now lets try to create a new user with as many validation errors as we can\nvar newUser = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('User', {\n    name: 'admin',\n    age: 'twenty-nine',\n    gender: 'not a valid gender'\n});\n\n// run some validation on the new user we just created\nvar errors = newUser.validate();\n\nconsole.log('Is User valid?', errors.isValid()); // returns 'false' as there were validation errors\nconsole.log('All Errors:', errors.items); // returns the array of all errors found on this model instance\n\nconsole.log('Age Errors:', errors.getByField('age')); // returns the errors for the age field\n</code></pre>\n\n<p>The key function here is <code>validate()</code>, which runs all of the configured validations and returns an <a href=\"#/api/Ext.data.Errors\">Errors</a> object. This simple object is just a collection of any errors that were found, plus some convenience methods such as <code>isValid()</code>, which returns true if there were no errors on any field, and <code>getByField()</code>, which returns all errors for a given field.</p>\n\n<p>For a complete example that uses validations please see <a href=\"guides/data/examples/associations_validations/index.html\">Associations and Validations</a></p>\n","title":"Using Models"});