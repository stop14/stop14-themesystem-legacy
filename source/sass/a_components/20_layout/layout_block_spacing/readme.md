# Layout Block Spacing
This component adds standardized spacing to all elements in the primary content column as determined by the block_spacing configuration value. 

This component was initially part of the layout_foundation_basic component, but has been separated out for compatibility across various systems.

Block spacing assumes that all HTML in the content column (beneath main > div or section > div) will have its own wrapping <div> tags, as is standard with CMSes like Drupal and Omeka. These <div> tags designate content blocks that require spacing for distinction.

This component will cause havoc, however, with systems that do not have wrapping content elemtents, as it will override the margin spacings for content elements like headers and paragraphs.

This is now optional, and should be added only when required.
