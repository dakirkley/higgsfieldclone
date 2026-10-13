import type { Niche } from "../types"

import { presets } from "./presets"

/**
 * Vireo — the general-purpose studio: every model, cinematic copy. Media we
 * generated ourselves (Soul 2, Kling 3.0) lives in /public/media.
 */
export const defaultNiche: Niche = {
  id: "default",
  brand: {
    name: "Vireo",
    tagline: "Direct images and video with every frontier model",
    description:
      "Vireo is an AI studio for images and video. Generate with Seedance, Kling, Wan, Soul and more — one credit balance, one library.",
    titleSuffix: "AI image & video studio",
    productionUrl: "https://vireo.studio",
    supportEmail: "support@vireo.studio",
    emailFrom: "Vireo <login@vireo.studio>",
    creatorFallback: "Vireo creator",
    ogImage: "/media/hero/coast.jpg",
  },
  theme: {},
  home: {
    hero: {
      eyebrow: "Every frontier model, one studio",
      title: ["Direct the shot.", "Skip the set."],
      body: "Turn a sentence or a single frame into cinematic video and images. Seedance, Kling, Soul and dozens more models share one credit balance and one library.",
      primary: { label: "Start creating", href: "/video" },
      secondary: { label: "Explore effects", href: "/effects" },
      video: "/media/loops/hero.mp4",
      poster: "/media/loops/hero.jpg",
    },
    promo: {
      title: ["One balance.", "Every model."],
      bullets: [
        "Switch models without switching apps",
        "Failed runs are refunded automatically",
        "Top-up credits never expire",
      ],
      cta: { label: "See plans & credits", href: "/pricing" },
      image: "/media/hero/songbird.jpg",
    },
    toolIds: [
      "seedance-2.5",
      "kling-3-std",
      "soul-2",
      "cinema-studio-4",
      "genjutsu-motion",
      "marketing-image-flare",
    ],
    sections: {
      effects: {
        title: "Visual effects",
        description:
          "Signature looks and camera moves. Pick one, add your subject, generate.",
        cta: "Try an effect",
      },
      models: {
        title: "Models",
        description:
          "The best image and video models in one place. Pick a family to open it in the generator.",
      },
      community: {
        title: "Community",
        description:
          "Fresh from creators who chose to publish. Open any piece to see its prompt and recreate it.",
      },
    },
    closing: {
      title: ["Your next shot", "starts with a sentence."],
      body: "Describe it, pick a model, press Generate. Keep the takes you love in your library and publish the best ones.",
      image: "/media/hero/coast.jpg",
      primary: { label: "Start creating", href: "/video" },
    },
  },
  effects: {
    navLabel: "Effects",
    title: "Visual effects",
    description:
      "Ready-made looks and camera moves. Pick one, describe your subject, and the effect brings the lighting, lens and motion.",
    ogImage: "/media/presets/neon-noir.jpg",
    eyebrow: { label: "Try for free", href: "/video" },
  },
  showcase: [
    {
      src: "/media/showcase/astronaut.jpg",
      chip: "Soul 2",
      title: "Frames with feeling",
      caption: "Portraits and stills with real skin, light and grain.",
    },
    {
      src: "/media/showcase/dancer.jpg",
      chip: "Seedance 2.5",
      title: "Motion that holds up",
      caption: "Up to 30-second shots from text, frames or references.",
    },
    {
      src: "/media/showcase/motorcycle.jpg",
      chip: "Kling 3.0",
      title: "Every model, one balance",
      caption: "Switch between 45+ image and video models in one studio.",
    },
    {
      src: "/media/showcase/koi.jpg",
      chip: "Effects",
      title: "Start from a look",
      caption: "Presets turn one idea into a finished style in a click.",
    },
  ],
  headlines: {
    video: {
      create: [
        "Make videos in one click",
        "Start from text, a first frame or a stack of references — then direct the camera.",
      ],
      edit: [
        "Edit any video with words",
        "Upload a clip, describe the change, keep the framing.",
      ],
      motion: [
        "Copy any motion",
        "Give us a motion clip and a character image; we transfer every move.",
      ],
    },
    image: {
      create: [
        "Start creating with any model",
        "Describe a scene, character, mood or style — and watch it come to life.",
      ],
      edit: [
        "Edit images with words",
        "Attach references and describe the change.",
      ],
      motion: ["Start creating", "Describe what you want to see."],
    },
    audio: {
      create: [
        "Turn text into sound",
        "Voices, effects and music from a single prompt.",
      ],
      edit: ["Edit audio", "Describe the change you want."],
      motion: ["Design a voice", "Describe the voice you need."],
    },
  },
  steps: {
    video: [
      {
        title: "Add image",
        body: "Upload or generate an image to set the first frame.",
        image: "/media/steps/add.jpg",
      },
      {
        title: "Choose preset",
        body: "Pick a camera move or style, or write your own direction.",
        image: "/media/steps/preset.jpg",
      },
      {
        title: "Get video",
        body: "Press Generate and your clip lands in History.",
        image: "/media/steps/result.jpg",
      },
    ],
    image: [
      {
        title: "Describe it",
        body: "Write the scene, subject and mood you have in mind.",
        image: "/media/steps/preset.jpg",
      },
      {
        title: "Pick a model",
        body: "Soul for people, Recraft for design, Ideogram for text.",
        image: "/media/steps/add.jpg",
      },
      {
        title: "Get images",
        body: "Generate, then reuse the best one as a video start frame.",
        image: "/media/steps/result.jpg",
      },
    ],
    audio: [
      {
        title: "Write a prompt",
        body: "Describe the sound, voice or music you want.",
        image: "/media/steps/preset.jpg",
      },
      {
        title: "Add a reference",
        body: "Optionally attach audio to steer the result.",
        image: "/media/steps/add.jpg",
      },
      {
        title: "Get audio",
        body: "Listen, download or use it in a video.",
        image: "/media/steps/result.jpg",
      },
    ],
  },
  footer: {
    tagline: ["Direct every", "frame yourself"],
    columns: [
      {
        title: "Create",
        links: [
          { label: "Image", href: "/image" },
          { label: "Video", href: "/video" },
          { label: "Edit video", href: "/video?tab=edit" },
          { label: "Motion control", href: "/video?tab=motion" },
          { label: "Effects", href: "/effects" },
        ],
      },
      {
        title: "Video models",
        links: [
          { label: "Seedance 2.5", href: "/video?model=seedance-2.5" },
          { label: "Kling 3.0", href: "/video?model=kling-3-std" },
          { label: "Wan 3.0", href: "/video?model=wan-3" },
          { label: "Cinema Studio 4.0", href: "/video?model=cinema-studio-4" },
          { label: "MiniMax H3", href: "/video?model=minimax-h3" },
        ],
      },
      {
        title: "Image models",
        links: [
          { label: "Soul 2", href: "/image?model=soul-2" },
          { label: "Soul Cinema", href: "/image?model=soul-cinema" },
          { label: "Grok Image 2.0", href: "/image?model=grok-image-2" },
          { label: "Ideogram 4.0", href: "/image?model=ideogram-4" },
          { label: "Recraft V4.1", href: "/image?model=recraft-4.1" },
        ],
      },
    ],
  },
  presets,
  mock: {
    imageDirs: ["media/presets", "media/showcase"],
    videoDirs: ["media/loops"],
  },
}
