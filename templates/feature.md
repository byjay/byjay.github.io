---
title: "{{ name }}"
date: {{ date | default('2025-12-03') }}
source: {{ source }}
---

# {{ name }}

{% if image_url %}![{{ name }}]({{ image_url }}){% endif %}

{{ description }}
