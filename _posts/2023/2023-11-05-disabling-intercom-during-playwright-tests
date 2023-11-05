---
layout: post
title: Disabling Intercom during Playwright tests
categories: dev
---
I recently ran into an issue where the [Intercom chat widget](https://www.intercom.com/) was interfering with my Playwright [integration tests](https://playwright.dev/). The widget was opening up and keeping some key elements from being clickable. A user could have easily dismissed the widget, but I didn't want to bother dismissing it within Playwright. I couldn't find any particular guidance on how to keep the widget from loading in the usual places on the web, so I had to come up with my own solution. 

What I ended up doing was intercepting all outbound requests Playwright was making and skipping any that called the Intercom domain.

I created this helper function:

```
import { Page } from '@playwright/test'

export async function blockIntercom(page: Page) {
  await page.route('**/*', route => {
    if (route.request().url().includes('intercom.io')) {
      route.abort()
    } else {
      route.continue()
    }
  })
}
```

And then called it in the test files that were affected:

```
import { Page, test } from '@playwright/test'
import { blockIntercom } from 'helpers/block-intercom'

let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  blockIntercom(page)
})

// your tests begin here
```

It shouldn't be too difficult to modify this to also block chat widgets from other vendors like Zendesk or Drift.
