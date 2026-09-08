import L from "leaflet";

export function createPinIcon(color) {
    return L.divIcon({
        className: "",
        html: `
            <div style="width: 28px; height: 36px;">
              <svg
                width="28"
                height="36"
                viewBox="0 0 28 36"
                xmlns="http://www.w3.org/2000/svg"
                style="display: block; filter: drop-shadow(0 3px 6px rgba(42, 36, 32, 0.45));"
              >
                <path
                  d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.73-6.27-14-14-14z"
                  fill="${color}"
                  stroke="#FFFFFF"
                  stroke-width="1.5"
                />
                <circle cx="14" cy="14" r="5.2" fill="#FFFFFF" />
                <circle cx="14" cy="14" r="2.4" fill="${color}" />
              </svg>
            </div>
          `,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -34],
    });
}

export function createLabelIcon(name, color) {
    return L.divIcon({
        className: "site-label",
        html: `
            <div style="background: ${color}; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; white-space: nowrap; box-shadow: 0 1px 3px rgba(42, 36, 32, 0.30);">
              ${name}
            </div>
          `,
        iconSize: undefined,
    });
}
