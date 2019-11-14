---
title: Self-Hosting a Ghost Blog with Gatsby
published: true
date: "2019-08-09"
tags: ["hosting", "gatsby", "ghost", "walkthrough"]
unsplash-image-id: "aWslrFhs1w4"
description: "With this being my first post, I thought I'd kick things off with a step-by-step guide into how I got my blog up and running. I'll also dive into the technology powering it behind the scenes."
category: "technology"
---

> _**Quick note:** Since writing this article, I've actually gone the route of using strictly Gatsby for my blog, but the content below still applies if you're thinking of using Ghost as your headless CMS._

I've finally done it, I've made the plunge and decided to create my own personal blog. This blog will mostly cover financial and technical topics that I find interesting. These could be topics that are new to me, or ones that I've been researching and using in my own personal life/career.

I figured what better way to kick off my new blog, than writing about how I actually implemented said blog. I was introduced to [Ghost](https://ghost.org/) through a friend and really liked the idea of a headless CMS. I also began looking into [Gatsby](https://www.gatsbyjs.org/) as my front-end component, since it offers the opportunity to really dig into [React](https://reactjs.org/) and [GraphQL](https://graphql.org/) as well.

## The Problem

One of the challenges I came across when implementing both solutions was deployability and the overall development process. I found a lot of articles, that suggested deploying to [Netlify](https://www.netlify.com/), and while this seems to be the easier solution, I really wanted to dive into what was happening under the hood, so I decided to deploy and host my blog on a Linux virtual machine (running Ubuntu 18.04) in Azure. I will take you through my deployment and development process as it stands right now.

## The Solution

The first thing you'll want to do is install both the Gatsby and Ghost CLI tools using NPM.

```
npm install -g ghost-cli
npm install -g gatsby-cli
```

Next, you'll want to begin developing and working on your blog locally to make sure everything is up to snuff. To do this, I will create two separate directories, one for Gatsby and the other for my Ghost installation. The Gatsby directory will be versioned in source control, but as we'll soon find out, this isn't the easiest solution in the world for Ghost and one of the major factors in deciding to go the headless route.

[Setting up Ghost locally](https://ghost.org/docs/install/local/) is very easy. In fact, its really just one line of code from your terminal or command prompt: `ghost install local`.
With this command, Ghost will run through various checks to validate system requirements and begin downloading and installing the latest version of Ghost onto your local machine. It will also start up your local instance after completing the installation. Once it's finished, you can confirm it's running by navigating to localhost on whatever port it set for you (default is 2368). It's now time to set up and configure Gatsby to serve your static front-end content.

Make your way to the directory you created for Gatsby and run the following command in your terminal:

```
gatsby new blog-frontend https://github.com/TryGhost/gatsby-starter-ghost.git
```

This will pull down a starter template from Github that allows you to get up and running very quickly. Once this completes, `cd` into your new blog directory and run either `yarn` or `npm install` to install any needed dependencies. Once those are installed, running `gatsby develop` will compile your site and give you another port to test on localhost (typically port 8000).

If everything above went smoothly, congratulations, you now have a working blog! But, that's not the end of our journey. We need to create a process that allows us to continually make changes and update our blog in production. We'll do that next.

## Moving to Production

After you've edited your front-end and you're happy with the look and feel, it's time to show the world what you've accomplished! I did quite a bit of research but was unable to find a simple solution for migrating my local Ghost instance to a production server, while keeping all of the content and themes in tact (another reason why I trended toward a headless solution). This was also why I chose not to version Ghost, as you'll need to run a fresh install anytime you stand up a new production or local copy.

So, with that being said, let's install our public blog. There is a pretty detailed outline of installing a production-ready instance of ghost on [their documentation website](https://ghost.org/docs/install/ubuntu/), but one thing to note is that there are some prerequisites. One of those being Ubuntu 16.04 or Ubuntu 18.04. Coming from the Microsoft world, I was limited to developing locally on my Windows machine. This presented problem number 2 for versioning Ghost. When installing on your production machine (Linux), Ghost creates a [symlink](https://en.wikipedia.org/wiki/Symbolic_link) between the current directory and the version directory within the root folder. This was an issue, since [Git will not handle symlinks](https://stackoverflow.com/questions/954560/how-does-git-handle-symbolic-links) well unless [explicitly told to](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coresymlinks).

If you followed the documentation above and have a production instance up and running, its time to pull down your versioned copy of Gatsby and follow the same steps as above (navigate to the Gatsby directory and install any necessary dependencies). Once that's complete, your ready to build your final version and let the world see what you've accomplished! Simply run `gatsby build` and a public directory will be created for you, containing any static assets necessary for your production site.

## Configuring the Server

If you followed [Ghost's documentation](https://ghost.org/docs/install/ubuntu/) for setting up your production instance, it will install and configure Nginx for you and, depending on your choice in setup, will also configure SSL. However, because we're using Gatsby to serve our front-end content, we'll need to adjust our Nginx configuration file a bit more.

Navigate to the `/etc/nginx/sites-enabled` directory and open the `.conf` file that is associated with your site (this will have an `-ssl` suffix if you allowed Ghost to configure ssl for your site above) in whatever text editor you feel comfortable with. Another option is to create a copy of your file, so if there are any issues, you can start over using the configuration file that Ghost created for you.

If you opened the `-ssl` conf file, you should see something similar to this:

```bash
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name **your-domain-name**;
    root **path-to-your-nginx-root**;

    ssl_certificate **your-ssl-cert**;
    ssl_certificate_key **your-ssl-cert-key**;
    include **ssl-params-configuration**;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:2368; #default port that Ghost runs on

    }

    location ~ /.well-known {
        allow all;
    }

    client_max_body_size 50m;
}
```

After making adjustments (or creating a new `.conf` file with the same settings as above), your new configuration file with Gatsby enabled should look like this:

```bash
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name **your-domain-name**;
    root **path-to-your-gatsby-directory**/public;

    ssl_certificate **your-ssl-cert**;
    ssl_certificate_key **your-ssl-cert-key**;
    include **ssl-params-configuration**;

    location / {
        index index.html;
    }

    location /ghost {
        root **path-to-your-nginx-root**;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:2368; #default port that Ghost runs on
    }

    location ~ /.well-known {
        allow all;
    }

    client_max_body_size 50m;
}
```

There are a few things to note about the updated configuration file. First, you'll notice that the root path is now pointing at the Gatsby directory we created earlier and, more specifically, at the public directory. This is where all of our static content lives. Second, you'll notice the default location is now pointing to our index.html file within our Gatsby directory. The other location that we explicitly define is our `/ghost` route and this is implementing the same configuration logic that was in the initial `.conf` file. This essentially tells Nginx to serve the Ghost back-end anytime the `/ghost` path is requested. This allows any administrative tasks like creating or updating posts to still be accessible.

After you've updated your config file, it's time to restart the server. Run the following command `sudo service nginx restart` and your site should now be up and running, pointing to your new Gatsby front-end.

## Final Thoughts

By now, your site should be up and running, so I'll leave you with a few final thoughts moving forward. First, any updates you make to your back-end, including new or updated posts, will require a new build within the Gatsby directory. Second, any new posts you create [will need to be exported](https://ghost.org/faq/the-importer/) in order to create backups in the event that something happens to your production server. My plan in the future is to create a job that automates this process, but in the meantime I'm manually creating backups anytime a new post is created.

I'm sure the process I've outlined will change overtime as I become more familiar with the intricacies of both frameworks, but for now this is my process for shifting between my development and production environments.

Side note: there may be a few files you want to keep secret, but still need in source control for any future environment migrations. The one that specifically comes to mind for me is the `.ghost.json` file, which stores your production url and api key. In order to prevent any updates you make in production from getting into source control, run the following git command in your terminal on your production server:

```bash
git update-index --skip-worktree .ghost.json
```

This will ignore changes to that file, both local and upstream, until you decide to allow them again with:

```bash
git update-index --no-skip-worktree .ghost.json
```

You can also get a list of any files that are marked skipped with the following command:

```bash
git ls-files -v . | grep ^S
```

That's it. Hope this post helped get you set up and running smoothly. I'll write about any updates regarding automation or enhancements to my process in future posts. Thanks for reading, and happy blogging!
