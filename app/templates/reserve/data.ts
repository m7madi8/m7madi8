export type SlotStatus = "available" | "limited" | "unavailable";

export type TimeSlot = {
  time: string;
  label: string;
  status: SlotStatus;
};

export type Occasion =
  | "None"
  | "Birthday"
  | "Anniversary"
  | "Business Dinner"
  | "Other";

export type GuestDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occasion: Occasion;
  notes: string;
};

export type Reservation = {
  dateISO: string;
  time: string;
  timeLabel: string;
  guests: number;
  details: GuestDetails;
  status: "draft" | "confirmed";
  reference: string;
};

export const RESTAURANT = {
  name: "NOIR",
  eyebrow: "RAMALLAH · PALESTINE",
  tagline: "An Evening Worth Remembering.",
  supporting:
    "Contemporary Palestinian dining, built around fire, stone, and quiet hospitality — in the heart of Ramallah.",
  address: "12 Rukab Street, Al-Masyoun, Ramallah, Palestine",
  phone: "+970 2 240 1188",
  phoneTel: "+97022401188",
  heroImage:
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1920&auto=format&fit=crop",
};

export const RAW_TIMES = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return toISODate(d);
}

export function formatTimeLabel(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  let state = h;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return (state % 10000) / 10000;
  };
}

export function getMockAvailability(dateISO: string, guests: number) {
  const rand = seededRandom(`${dateISO}-${guests}`);
  const isFullyBookedDay = dateISO.endsWith("-08-26");
  const isSpecCaseDay = dateISO.endsWith("-08-28");

  const slots: TimeSlot[] = RAW_TIMES.map((time) => {
    let status: SlotStatus;

    if (isFullyBookedDay) {
      status = "unavailable";
    } else if (isSpecCaseDay) {
      const scripted: Record<string, SlotStatus> = {
        "17:30": "available",
        "18:00": "available",
        "18:30": "limited",
        "19:00": "available",
        "19:30": "unavailable",
        "20:00": "available",
        "20:30": "limited",
        "21:00": "available",
      };
      status = scripted[time];
    } else {
      const r = rand();
      const pressure = guests >= 6 ? 0.15 : guests >= 4 ? 0.08 : 0;
      if (r < 0.12 + pressure) status = "unavailable";
      else if (r < 0.32 + pressure) status = "limited";
      else status = "available";
    }

    return { time, label: formatTimeLabel(time), status };
  });

  return { dateISO, slots };
}

export function nextAvailableSlot(
  fromDateISO: string,
  guests: number,
  daysToCheck = 7
): { dateISO: string; time: string; label: string } | null {
  const start = new Date(`${fromDateISO}T00:00:00`);
  for (let i = 0; i <= daysToCheck; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const iso = toISODate(d);
    const avail = getMockAvailability(iso, guests);
    const found = avail.slots.find((s) => s.status !== "unavailable");
    if (found) {
      return { dateISO: iso, time: found.time, label: found.label };
    }
  }
  return null;
}

export function makeReference(): string {
  const n = Math.floor(1000 + Math.random() * 8999);
  return `NB-${n}`;
}

export function formatDateReadable(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
