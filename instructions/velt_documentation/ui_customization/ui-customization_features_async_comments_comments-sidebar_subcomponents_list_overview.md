Title: Overview - Velt

URL Source: https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/list/overview

Markdown Content:
Overview - Velt

===============

[Velt home page![Image 2: light logo](https://mintlify.s3.us-west-1.amazonaws.com/velt/velt-logo-big-light.png)![Image 3: dark logo](https://mintlify.s3.us-west-1.amazonaws.com/velt/velt-logo-big.png)](https://docs.velt.dev/)

Search or ask...

Ctrl K Ask AI

*   [Get API Key](https://console.velt.dev/)
*   [Get API Key](https://console.velt.dev/)

Search...

Navigation

[Documentation](https://docs.velt.dev/get-started/overview)[UI Customization](https://docs.velt.dev/ui-customization/overview)[API Reference](https://docs.velt.dev/api-reference/rest-apis/v2/organizations/add-organizations)[Release Notes](https://docs.velt.dev/release-notes/version-4/upgrade-guide)[Examples](https://velt.dev/examples)[DevTools](https://velt.dev/devtools)

##### Concepts

*   [Overview](https://docs.velt.dev/ui-customization/overview)
*   [Setup Wireframes](https://docs.velt.dev/ui-customization/setup)
*   [Layout Customization](https://docs.velt.dev/ui-customization/layout)
*   [CSS Customization](https://docs.velt.dev/ui-customization/styling)
*   [Template Variables](https://docs.velt.dev/ui-customization/template-variables)
*   [Conditional Templates](https://docs.velt.dev/ui-customization/conditional-templates)
*   [Action Components](https://docs.velt.dev/ui-customization/custom-action-component)
*   [Localisation](https://docs.velt.dev/ui-customization/localisation)

##### Async Collaboration

*   Comments
    *   Comment Dialog
    *   Comments Sidebar
        *   [Overview](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/overview)
        *   [Styling](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/styling)
        *   [Variants](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/variants)
        *   Subcomponents
            *   [Empty placeholder](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/empty-placeholder)
            *   Filter
            *   [Focused thread](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/focused-thread)
            *   Header
            *   List
                *   [Overview](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/list/overview)
                *   Subcomponents

            *   [Page mode composer](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/page-mode-composer)
            *   [Reset filter button](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/reset-filter-button)
            *   Sidebar Button
            *   [Skeleton](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/skeleton)

    *   Standalone Components (DIY)
    *   [Inline Comments Section](https://docs.velt.dev/ui-customization/features/async/comments/inline-comments-section)
    *   [Comment Pin](https://docs.velt.dev/ui-customization/features/async/comments/comment-pin)
    *   [Comment Tool](https://docs.velt.dev/ui-customization/features/async/comments/comment-tool)
    *   [Comment Bubble](https://docs.velt.dev/ui-customization/features/async/comments/comment-bubble)
    *   [Comment Player Timeline](https://docs.velt.dev/ui-customization/features/async/comments/comment-player-timeline)
    *   [Confirmation Dialog](https://docs.velt.dev/ui-customization/features/async/comments/confirm-dialog)
    *   [MultiThread Comment Dialog](https://docs.velt.dev/ui-customization/features/async/comments/multithread-comment-dialog)
    *   [Persistent Comment Mode Banner](https://docs.velt.dev/ui-customization/features/async/comments/persistent-comment-mode-banner)
    *   [Text Comment Tool](https://docs.velt.dev/ui-customization/features/async/comments/text-comment-tool)
    *   [Text Comment Toolbar](https://docs.velt.dev/ui-customization/features/async/comments/text-comment-toolbar)
    *   [Velt Video Player](https://docs.velt.dev/ui-customization/features/async/comments/comment-video-player)

*   In-app Notifications
*   Recorder
*   [Inline Reactions Section](https://docs.velt.dev/ui-customization/features/async/inline-reactions)
*   Arrows

##### Realtime Collaboration

*   [Presence](https://docs.velt.dev/ui-customization/features/realtime/presence)
*   [Cursors](https://docs.velt.dev/ui-customization/features/realtime/cursors)
*   [Single Editor Mode](https://docs.velt.dev/ui-customization/features/realtime/single-editor-mode)
*   [Live Selection](https://docs.velt.dev/ui-customization/features/realtime/live-selection)
*   Huddle

React / Next.js

HTML

Copy

Ask AI

```
<VeltWireframe>
    <VeltCommentsSidebarWireframe.List>
        <VeltCommentsSidebarWireframe.List.Item>
            <VeltCommentsSidebarWireframe.List.Item.Group />
            <VeltCommentsSidebarWireframe.List.Item.DialogContainer />
        </VeltCommentsSidebarWireframe.List.Item>
    </VeltCommentsSidebarWireframe.List>
</VeltWireframe>
```

List

Overview
========

Copy page

The subcomponent of the Comments Sidebar that represents the List of Comments in the Sidebar

Copy page

React / Next.js

HTML

Copy

Ask AI

```
<VeltWireframe>
    <VeltCommentsSidebarWireframe.List>
        <VeltCommentsSidebarWireframe.List.Item>
            <VeltCommentsSidebarWireframe.List.Item.Group />
            <VeltCommentsSidebarWireframe.List.Item.DialogContainer />
        </VeltCommentsSidebarWireframe.List.Item>
    </VeltCommentsSidebarWireframe.List>
</VeltWireframe>
```

We recommend that you familiarize yourselves with [UI Customization Concepts](https://docs.velt.dev/ui-customization/overview) before attempting to modify any components.

[​](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/list/overview#default-subcomponent)

Default Subcomponent
-----------------------------------------------------------------------------------------------------------------------------------------------------------

![Image 4](https://mintlify.s3.us-west-1.amazonaws.com/velt/images/customization/list.png)

Was this page helpful?

Yes No

[Overview](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/header/subcomponents/minimal-filter-dropdown/overview)[Dialog container](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/list/subcomponents/dialog-container)

[twitter](https://twitter.com/veltjs)[linkedin](https://www.linkedin.com/company/veltjs)

[Powered by Mintlify](https://mintlify.com/preview-request?utm_campaign=poweredBy&utm_medium=referral&utm_source=velt)

Assistant

Responses are generated using AI and may contain mistakes.

![Image 5](https://mintlify.s3.us-west-1.amazonaws.com/velt/images/customization/list.png)
