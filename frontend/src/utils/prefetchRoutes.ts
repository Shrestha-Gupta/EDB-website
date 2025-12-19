export function prefetchRoute(path: string) {
  switch (path) {
    case "/publications":
      import("../pages/Publications/PublicationsPage");
      break;
    case "/gallery":
      import("../pages/Gallery/GalleryPage");
      break;
    case "/canvas":
      import("../pages/Canvas/CanvasPage");
      break;
    case "/team":
      import("../pages/TeamPage");
      break;
    case "/events":
      import("../pages/Events/EventsPage");
      break;
    case "/magazine":
      import("../pages/MagazineIssues");
      break;
    case "/alumni":
      import("../pages/Alumni/AlumniPage");
      break;
    case "/contact":
      import("../pages/ContactPage");
      break;
    default:
      // noop for home or unknown
      break;
  }
}
