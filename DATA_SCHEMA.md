# SAC Website Data Schema

This document defines the JSON structure used by the redesigned SAC website.

## 1) `data/config.json`
Global site configuration.

```json
{
  "schemaVersion": "1.0.0",
  "siteTitle": "SAC IISER Kolkata",
  "calendar": {
    "publicEmbedUrl": "https://calendar.google.com/calendar/embed?...",
    "timezone": "Asia/Kolkata"
  },
  "dataSources": {
    "clubs": "https://raw.githubusercontent.com/slashdot-iiserk/SAC_website/main/data/clubs.json",
    "positions": "https://raw.githubusercontent.com/slashdot-iiserk/SAC_website/main/data/positions.json",
    "events": "https://raw.githubusercontent.com/slashdot-iiserk/SAC_website/main/data/events.json",
    "sacBodies": "https://raw.githubusercontent.com/slashdot-iiserk/SAC_website/main/data/sac-bodies.json",
    "articles": "https://raw.githubusercontent.com/slashdot-iiserk/SAC_website/main/data/articles.json"
  }
}
```

## 2) `data/clubs.json`
Array of clubs.

```json
[
  {
    "id": "astronomy-club",
    "name": "Singularity - Astronomy Club",
    "shortName": "Astronomy",
    "sacBody": "academics",
    "category": "Academic",
    "description": "Explore the cosmos...",
    "manifesto": "Our vision is...",
    "logo": "assets/logos/astronomy.svg",
    "bannerImage": "assets/photos/club-photos/astronomy-banner.jpg",
    "facilities": ["Telescope", "Observation deck"],
    "socialLinks": {
      "instagram": "https://instagram.com/...",
      "email": "astronomy@iiserkol.ac.in"
    },
    "officeBearer": {
      "name": "Aman Kumar",
      "role": "Club Convener",
      "email": "aman@iiserkol.ac.in",
      "phone": "+91-...",
      "bio": "...",
      "photo": "assets/photos/office-bearers/aman-kumar.jpg"
    },
    "members": [
      {
        "name": "Member Name",
        "role": "Treasurer",
        "email": "member@iiserkol.ac.in",
        "bio": "Short bio",
        "photo": "assets/photos/club-photos/member-name.jpg"
      }
    ],
    "flagshipEvents": [
      {
        "id": "stargazing-2024",
        "name": "Stargazing Night 2024",
        "date": "2024-11-15",
        "description": "Annual stargazing event...",
        "photos": ["assets/photos/club-photos/stargazing-1.jpg"]
      }
    ],
    "upcomingEvents": [
      {
        "name": "Meteor Shower Observation",
        "date": "2025-08-12",
        "description": "Join us to observe the Perseid meteors"
      }
    ],
    "additionalContent": []
  }
]
```

## 3) `data/positions.json`
All leadership/office-bearer data grouped by body.

```json
[
  {
    "body": "SAC",
    "bodyId": "sac",
    "bodyType": "main",
    "positions": [
      {
        "id": "gs-general",
        "title": "General Secretary",
        "name": "Priya Sharma",
        "email": "priya@iiserkol.ac.in",
        "phone": "+91-...",
        "bio": "Passionate about...",
        "photo": "assets/photos/office-bearers/priya-sharma.jpg"
      }
    ]
  }
]
```

## 4) `data/events.json`
Featured and general events feed.

```json
[
  {
    "id": "featured-1",
    "title": "Annual Science Fair",
    "date": "2025-03-15",
    "endDate": "2025-03-17",
    "description": "Multi-day science fair showcasing...",
    "image": "assets/photos/events/science-fair-2024.jpg",
    "organizers": ["SAC Academics"],
    "featured": true,
    "googleCalendarEventId": "..."
  }
]
```

## 5) `data/sac-bodies.json`
SAC body records and linked clubs.

```json
[
  {
    "id": "academics",
    "name": "SAC Academics",
    "description": "Oversees academic clubs...",
    "icon": "assets/icons/academics.svg",
    "clubs": ["astronomy-club", "debating-society"],
    "generalSecretary": {
      "name": "Rohan Das",
      "email": "rohan@iiserkol.ac.in"
    },
    "overview": "..."
  }
]
```

## 6) `data/articles.json`
Helpful SAC resources/articles.

```json
[
  {
    "id": "article-1",
    "title": "How to organize a flagship event",
    "summary": "A practical checklist for club teams",
    "author": "SAC Editorial",
    "publishedAt": "2026-01-15",
    "tags": ["events", "operations"],
    "coverImage": "assets/images/articles/event-guide.jpg",
    "url": "https://example.org/article"
  }
]
```

## Field notes
- `id` and `bodyId` should be stable and URL-safe (kebab-case).
- Dates should use ISO format (`YYYY-MM-DD`).
- Only publish contact details explicitly approved for public display.
- Keep bios concise and readable.
- Media paths should remain repository-relative for GitHub Pages compatibility.
