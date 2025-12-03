---
title: "{{ name }} ({{ software }})"
date: {{ date | default('2025-12-03') }}
category: {{ category }}
difficulty: {{ difficulty }}
layout: feature
---

# {{ name }}

<div class="feature-meta">
    <span class="badge software {{ software | lower }}">{{ software }}</span>
    <span class="badge difficulty {{ difficulty | lower }}">{{ difficulty }}</span>
</div>

## 기능 설명 (Description)
{{ description }}

<!-- AdSense Fluid -->
<div class="ad-container" style="margin: 20px 0;">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5240158357882882" crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-format="fluid"
         data-ad-layout-key="-6t+ed+2i-1n-4w"
         data-ad-client="ca-pub-5240158357882882"
         data-ad-slot="3083770395"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>

{% if videos %}
## 동영상 강좌 (Video Tutorial)
<div class="video-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/{{ videos[0] }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<!-- AdSense Square -->
<div class="ad-container" style="text-align:center; margin: 20px 0;">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5240158357882882" crossorigin="anonymous"></script>
    <!-- 사각1 -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-5240158357882882"
         data-ad-slot="5669571134"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
{% endif %}

## 사용 방법 (Step-by-Step)
{% if steps %}
<div class="steps-container">
    <ol>
    {% for step in steps %}
        <li>{{ step }}</li>
    {% endfor %}
    </ol>
</div>
{% else %}
<p>상세 단계가 없습니다.</p>
{% endif %}

{% if images %}
## 스크린샷 (Screenshots)
<div class="gallery">
    {% for img in images %}
    <img src="{{ img }}" alt="{{ name }} screenshot" class="feature-image">
    {% endfor %}
</div>
{% endif %}

## 관련 명령어
* [관련 명령어 링크 1](#)
* [관련 명령어 링크 2](#)
