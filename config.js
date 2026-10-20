// ONE place for deploy settings. After hosting, change BASE_URL and run: python3 tools/regen_qr.py <BASE_URL>
window.PARADE_CONFIG = {
  BASE_URL: "https://example.com/parade/",   // PLACEHOLDER - update once hosted
  DEMO_MODE: true,                            // form never leaves the browser
  // GHL_WEBHOOK_URL: "https://services.leadconnectorhq.com/hooks/XXXX/webhook-trigger/YYYY", // NOT ACTIVE - Jacob Morley Real Estate sub-account only
  TEXT_KEYWORD: "PARADE",
  TEXT_NUMBER: "[GHL number TBD]",          // PLACEHOLDER - Jacob's A2P-registered GHL number
  GALLERY_URL: "https://bigrockhomesut.com/#portfolio-page", // Big Rock past builds
  JACOB_SITE: "https://jacobmorleyrealestate.com",
  TAGS: { source: "parade", builder: "bigrock", prop: "BR52P" }
};
