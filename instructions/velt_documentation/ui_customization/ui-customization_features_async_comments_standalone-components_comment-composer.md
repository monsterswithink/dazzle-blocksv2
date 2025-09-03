Title: Comment Composer - Velt

URL Source: https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer

Markdown Content:
Comment Composer - Velt

===============

[Velt home page![Image 1: light logo](https://mintlify.s3.us-west-1.amazonaws.com/velt/velt-logo-big-light.png)![Image 2: dark logo](https://mintlify.s3.us-west-1.amazonaws.com/velt/velt-logo-big.png)](https://docs.velt.dev/)

Search or ask...

Ctrl K Ask AI

*   [Get API Key](https://console.velt.dev/)
*   [Get API Key](https://console.velt.dev/)

Search...

Navigation

Standalone Components (DIY)

Comment Composer

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
    *   Standalone Components (DIY)
        *   [Comment Composer](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer)
        *   [Comment Thread](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-thread)
        *   [Comment Pin](https://docs.velt.dev/ui-customization/features/async/comments/comment-pin)

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

On this page

*   [VeltCommentComposerWireframe](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#veltcommentcomposerwireframe)
*   [VeltCommentDialogWireframe.Composer](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#veltcommentdialogwireframe-composer)
*   [Styling](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#styling)
*   [Disable ShadowDOM](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#disable-shadowdom)
*   [Dark Mode](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#dark-mode)
*   [Variants](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#variants)

Standalone Components (DIY)

Comment Composer
================

Copy page

Copy page

We recommend that you familiarize yourselves with [UI Customization Concepts](https://docs.velt.dev/ui-customization/overview) before attempting to modify any components.

This component is a thin wrapper around the [Comment Dialog Composer](https://docs.velt.dev/ui-customization/features/async/comments/comment-dialog/subcomponents/composer/overview) component.
[​](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#veltcommentcomposerwireframe)

VeltCommentComposerWireframe
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

*    React / Next.js
*    Other Frameworks

Copy

Ask AI

```
<VeltCommentComposerWireframe>
    <VeltCommentDialogWireframe.Composer />
</VeltCommentComposerWireframe>
```

### [​](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#veltcommentdialogwireframe-composer)

VeltCommentDialogWireframe.Composer

You can find the wireframe for the `Comment Composer`[here](https://docs.velt.dev/ui-customization/features/async/comments/comment-dialog/subcomponents/composer/overview).
[​](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#styling)

Styling
---------------------------------------------------------------------------------------------------------------------------

### [​](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#disable-shadowdom)

Disable ShadowDOM

*   By default, ShadowDOM is used to ensure that your app’s CSS does not interfere with the styling of the SDK components.
*   Disable the shadow dom to apply your custom CSS to the component.

`Default: true`

*    React / Next.js
*    Other Frameworks

Copy

Ask AI

```
<VeltCommentComposer shadowDom={false} />
```

### [​](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#dark-mode)

Dark Mode

`Default: false`

*    React / Next.js
*    Other Frameworks

Copy

Ask AI

```
<VeltCommentComposer darkMode={true} />
```

### [​](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-composer#variants)

Variants

*   Define variants for the entire Comment Composer component. This will enable you to show different Composer UI in different parts of your app.
*   Alternatively, define a variant for the Comment Dialog component and use it here. This will enable you to show different Comment Dialog UI on the DOM vs here.
*   Learn more about how to define and use variants [here](https://docs.velt.dev/ui-customization/layout#variants).

*    React / Next.js
*    Other Frameworks

Copy

Ask AI

```
<VeltCommentComposer
  variant="component-variant"
  dialogVariant="dialog-variant"
/>
```

Was this page helpful?

Yes No

[Skeleton](https://docs.velt.dev/ui-customization/features/async/comments/comments-sidebar/subcomponents/skeleton)[Comment Thread](https://docs.velt.dev/ui-customization/features/async/comments/standalone-components/comment-thread)

[twitter](https://twitter.com/veltjs)[linkedin](https://www.linkedin.com/company/veltjs)

[Powered by Mintlify](https://mintlify.com/preview-request?utm_campaign=poweredBy&utm_medium=referral&utm_source=velt)

Assistant

Responses are generated using AI and may contain mistakes.
