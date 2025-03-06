'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function PublicNav() {

  return (
    <>
        <div className='flex py-5 justify-between'>
          <NavigationMenu className='flex-grow'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='https://nicolasbolt.com/'
                  className={navigationMenuTriggerStyle()}
                >
                  <span className='text-xl text-purple-800'>Nicolas Bolt</span>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Free Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <a
                          className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          href='https://nicolasbolt.com/'
                        >
                          <div className='mb-2 mt-4 text-lg font-medium'>
                            Free Tools
                          </div>
                          <p className='text-sm leading-tight text-muted-foreground'>
                            Discover a variety of resources, blog posts, and
                            guides to help you with your language learning
                            journey.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href='https://nicolasbolt.com/notion' title='Notion Templates'>Notion Templates to better organize your language learning!</ListItem>
                    <ListItem href='https://nicolasbolt.com/marketing-boilerplate' title='Marketing Boilerplate'>Marketing landing page to better sell your products</ListItem>
                    <ListItem href='https://nicolasbolt.com/saas-starter-app' title='SaaS Starter App'>A SaaS starter app to quickly launch complete products</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href='https://nicolasbolt.com/about'
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
    </>
  );
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          //   ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = 'ListItem';