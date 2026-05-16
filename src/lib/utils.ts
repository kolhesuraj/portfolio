/* eslint-disable @typescript-eslint/no-explicit-any */
import { currencySymbols, monthMapping } from "@/constants/common-data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
export const allowedSpecialChars = `!@#$%^&*()-+=[]{}|\\:;"'<>,.?/~_\``;

export function getUnsupportedCharacters(password: string): string[] {
  return [
    ...new Set(
      [...password].filter(
        (char) =>
          !/[a-zA-Z0-9]/.test(char) && !allowedSpecialChars.includes(char),
      ),
    ),
  ];
}

export const numberFormatter = {
  format: (
    value: number | bigint,
    minFractionDigits = 0,
    currencyCode: string = "USD", // Default to 'USD' if not provided,
    maxFractionDigits = 2,
  ) => {
    const symbol = currencySymbols[currencyCode] || currencyCode; // Use custom symbol or fallback to currency code
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    });
    const formattedValue = formatter.format(value);
    return formattedValue.replace(/\p{Sc}/u, symbol);
  },

  formatPercentage: (value: number, minFractionDigits = 0) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: 2,
    });
    return formatter.format(value / 100);
  },
};

export const currency = numberFormatter.format;

export const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
});

export const getCurrencySymbol = (currencyCode: string = "USD"): string => {
  return currencySymbols[currencyCode] || "$";
};

export default function getInitials(
  firstName: string,
  lastName: string,
): string {
  if (lastName)
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  return firstName.charAt(0).toUpperCase();
}

export function separateWordsByCase(input) {
  return input?.replace(/([A-Z])/g, " $1").trim();
}

export function formatResoureType(input: string) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const getColor = (colorName: string) => {
  switch (colorName) {
    case "Accents/Yellow":
      return "#FFBE29";
    case "Accents/Red":
      return "#F0141B";
    case "Accents/Green":
      return "#78950E";
    default:
      return "#000000";
  }
};

export const getColorFromValue = (value) => {
  if (value >= 0 && value <= 49) return "Accents/Red";
  if (value >= 50 && value <= 89) return "Accents/Yellow";
  if (value >= 90 && value <= 100) return "Accents/Green";
  return "#000000";
};

export const calculateAverage = (
  data: Record<string, number | { message?: string }>,
  ignoreKey = "",
) => {
  if (!data) return 0;
  if ((data as any).message) return 0;

  const filterData = { ...data };
  if (ignoreKey) delete filterData[ignoreKey];

  const values = Object.values(filterData);
  const sum = values.reduce((acc: number, value: any) => {
    if (!value.message && !Number.isNaN(Number(value))) {
      return (acc += value);
    }
    return acc;
  }, 0);

  return Math.round(sum / values.length);
};

export function convertMarkdownToHTML(markdown) {
  // Convert headings with Tailwind CSS classes for margins
  let html = markdown
    .replace(
      /^###### (.*$)/gim,
      '<h6 class="mt-4 mb-2 text-base pl-10">$1</h6>',
    )
    .replace(/^##### (.*$)/gim, '<h5 class="mt-4 mb-2 text-base pl-8">$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4 class="mt-4 mb-2 text-base pl-6">$1</h4>')
    .replace(
      /^### (.*$)/gim,
      '<h3 class="mt-4 mb-2 text-lg font-semibold pl-4">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="mt-4 mb-2 text-primary text-xl font-semibold pl-2">$1</h2>',
    )
    .replace(/^# (.*$)/gim, '<h1 class="mt-4 mb-2 text-base">$1</h1>');

  // Convert bold and italic text, excluding list items for bold
  html = html
    .replace(/^\*\*(.*?)\*\*$/gm, '<strong class="text-base">$1</strong>') // Only apply bold outside of lists
    .replace(/\*(.*?)\*/gim, '<em class="text-base">$1</em>'); // Apply text-base for italic

  // Convert inline code
  html = html.replace(/`([^`]+)`/gim, '<code class="text-base">$1</code>');

  // Convert links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" class="text-base">$1</a>',
  );

  // Convert list items with indentation
  html = html
    .replace(/^\s*-\s+(.*$)/gim, '<li class="text-base pl-8">$1</li>')
    .replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="text-base pl-8">$1</li>')
    .replace(/<\/li>\n<li>/gim, '</li><li class="text-base pl-8">'); // Handle consecutive list items

  // Wrap list items with <ul> tags for indentation
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul class="pl-8">$1</ul>');

  // Convert horizontal rule
  html = html.replace(/^(?:---)$/gm, '<hr class="mt-4"/>');

  // Convert tables
  html = html.replace(
    /\|(.+?)\|?\n\|([-:\s|]+)\|\n((?:\|.*\|\n)+)/g,
    (_, header, separator, body) => {
      const headers = header
        .replace(/(^\||\|$)/g, "")
        .split("|")
        .map((text) => `<th class="px-4 py-2 border">${text.trim()}</th>`)
        .join("");
      const rows = body
        .trim()
        .split("\n")
        .map((row) => {
          const cells = row
            .replace(/(^\||\|$)/g, "")
            .split("|")
            .map((text) => `<td class="px-4 py-2 border">${text.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<table class="table-auto w-full border-collapse"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    },
  );

  // Convert line breaks
  html = html.replace(/\n/gim, "");

  // Wrap the entire HTML in a div with line height class
  return `<div class="leading-relaxed">${html.trim()}</div>`;
}

export const getRelativeTime = (date1, date2) => {
  const diffInSeconds = Math.floor((date2 - date1) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const excessDays = diffInDays % 30;
  const diffInYears = Math.floor(diffInMonths / 12);
  const excessMonths = diffInMonths % 12;

  const formatWithPlural = (value, unit) =>
    value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;

  if (diffInMinutes === 0) {
    return "just now";
  }

  if (diffInYears > 0) {
    return `${formatWithPlural(diffInYears, "year")} ${formatWithPlural(
      excessMonths,
      "month",
    )}`;
  }

  if (diffInMonths > 0) {
    return `${formatWithPlural(diffInMonths, "month")} ${formatWithPlural(
      excessDays,
      "day",
    )}`;
  }

  if (diffInDays > 0) return formatWithPlural(diffInDays, "day");
  if (diffInHours > 0) return formatWithPlural(diffInHours, "hour");
  if (diffInMinutes > 0) return formatWithPlural(diffInMinutes, "minute");
  return formatWithPlural(diffInSeconds, "second");
};

export const getLast6Months = () => {
  const months: any = [];
  const date = new Date();
  for (let i = 0; i < 6; i++) {
    months.push(
      new Date(date.getFullYear(), date.getMonth() - i).toLocaleString(
        "default",
        { month: "long", year: "numeric" },
      ),
    );
  }
  return months;
};

export const getLast6MonthsExcludeCurrentMonth = () => {
  const months: string[] = [];
  const date = new Date();

  // Start from previous month
  date.setMonth(date.getMonth() - 1);

  for (let i = 0; i < 6; i++) {
    months.push(
      new Date(date.getFullYear(), date.getMonth() - i).toLocaleString(
        "default",
        { month: "long", year: "numeric" },
      ),
    );
  }

  return months;
};

export function convertToYYYYMM(value) {
  const [month, year] = value.split(" ");
  const date = new Date(`${month} 1, ${year}`);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

function isHex(input: string): boolean {
  const hex = input.trim();
  if (hex.startsWith("#")) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/.test(hex);
  }
  return false;
}

export function hexToHsl(input: string) {
  if (isHex(input)) {
    let hex,
      alpha = "FF";
    if (input.length === 4) {
      hex = `#${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}`;
    } else if (input.length === 9) {
      hex = input.slice(0, 7);
      alpha = input.slice(-2);
    } else {
      hex = input;
    }

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    let r = parseInt((result && result[1]) || "00", 16);
    let g = parseInt((result && result[2]) || "00", 16);
    let b = parseInt((result && result[3]) || "00", 16);
    const a = parseInt(alpha, 16) / 255;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ((r /= 255), (g /= 255), (b /= 255));
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    s = s * 100;
    s = Math.round(s * 10) / 10;
    l = l * 100;
    l = Math.round(l * 10) / 10;
    h = Math.round(360 * h * 10) / 10;

    if (a < 1) {
      return `${h} ${s}% ${l}% ${a.toFixed(2)}`;
    } else {
      return `${h} ${s}% ${l}%`;
    }
  }
  return input;
}

// Helper to convert short month format to full format
export const formatMonth = (month: string): string => {
  const [shortMonth, year] = month.split(" ");
  const monthMap: { [key: string]: string } = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };
  return `${monthMap[shortMonth]} ${year}`;
};

export const isMonetaSupportClicked = (value: string) => {
  const monetaSupportSubMenus = ["Moneta Academy", "Moneta Documentation"];

  return monetaSupportSubMenus.includes(value);
};

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const compressImage = (
  file: File,
  maxSizeMB: number = 1,
  maxWidth: number = 720,
  maxHeight: number = 580,
) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Resize the image if it's larger than the maximum dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (maxHeight / width) * height;
            width = maxWidth;
          } else {
            width = (maxWidth / height) * width;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        // Compress the image to reduce its size
        canvas.toBlob(
          (blob) => {
            if (blob && blob.size / 1024 / 1024 > maxSizeMB) {
              const quality = Math.max(
                0.7,
                1 - blob.size / 1024 / 1024 / maxSizeMB,
              );
              const compressedBlob = canvas.toDataURL("image/jpeg", quality);
              resolve(compressedBlob);
            } else {
              const dataUrl = canvas.toDataURL("image/jpeg");
              resolve(dataUrl);
            }
          },
          "image/jpeg",
          0.9,
        ); // Adjust quality for further compression
      };
      img.onerror = (error) => reject(error);
    };
  });
};

export const checkAccountIsAzure = (id: string, accountList: any) => {
  return accountList.some((x) => x?.id === id && x?.csp === "Azure");
};

export const compressImageMaintainAspect = (
  file: File,
  maxSizeMB: number = 1,
  maxWidth: number = 720,
  maxHeight: number = 580,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        const scaleFactor = Math.min(maxWidth / width, maxHeight / height, 1);
        width = Math.round(width * scaleFactor);
        height = Math.round(height * scaleFactor);

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Preserve transparency for PNGs
          if (file.type === "image/png") {
            ctx.clearRect(0, 0, width, height);
          }
          ctx.drawImage(img, 0, 0, width, height);
        }

        // Determine the format dynamically
        const format = file.type === "image/png" ? "image/png" : "image/jpeg";
        const quality = format === "image/png" ? 1.0 : 0.9; // PNG doesn't use quality

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size / 1024 / 1024 > maxSizeMB) {
              // Reduce JPEG quality only if needed
              const compressedBlob = canvas.toDataURL(
                format,
                Math.max(0.7, 1 - blob.size / 1024 / 1024 / maxSizeMB),
              );
              resolve(compressedBlob);
            } else {
              resolve(canvas.toDataURL(format, quality));
            }
          },
          format,
          quality,
        );
      };
      img.onerror = (error) => reject(error);
    };
  });
};

function isValidBase64(str) {
  try {
    return btoa(atob(str)) === str.replace(/\s/g, ""); // Remove whitespace before checking
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return false;
  }
}

export function isBase64Image(str) {
  if (str) {
    const match = str.match(/^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/=]+)$/);

    return match ? isValidBase64(match[1]) : false;
  } else {
    return false;
  }
}

export function addSpaceBeforeCapital(str) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function getCurrentMonthValue(data: Record<string, string>[]) {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  const entry = data.find((obj) =>
    Object.prototype.hasOwnProperty.call(obj, monthYear),
  );

  return entry ? entry[monthYear] : null;
}

export function isIAMPermission(permission: string) {
  const azureAuthRegex = /^Microsoft\.Authorization\/.*/;
  const awsAuthRegex = /^iam:[A-Za-z0-9*]+/;
  return azureAuthRegex.test(permission) || awsAuthRegex.test(permission);
}

export function getCurrentMonthYear(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
}
export const formatDateToYYYYMMDD = (dateStr) => {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatUTCDateToYYYYMMDD = (dateStr) => {
  const date = new Date(dateStr);

  const utcYear = date.getUTCFullYear();
  const utcMonth = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const utcDay = String(date.getUTCDate()).padStart(2, "0");

  return `${utcYear}-${utcMonth}-${utcDay}`;
};

export const awsRegions = [
  { label: "us-west-2", value: "us-west-2" },
  { label: "us-west-1", value: "us-west-1" },
  { label: "us-east-2", value: "us-east-2" },
  { label: "us-east-1", value: "us-east-1" },
  { label: "sa-east-1", value: "sa-east-1" },
  { label: "me-south-1", value: "me-south-1" },
  { label: "me-central-1", value: "me-central-1" },
  { label: "eu-west-3", value: "eu-west-3" },
  { label: "eu-west-2", value: "eu-west-2" },
  { label: "eu-west-1", value: "eu-west-1" },
  { label: "eu-south-2", value: "eu-south-2" },
  { label: "eu-south-1", value: "eu-south-1" },
  { label: "eu-north-1", value: "eu-north-1" },
  { label: "eu-central-2", value: "eu-central-2" },
  { label: "eu-central-1", value: "eu-central-1" },
  { label: "ca-central-1", value: "ca-central-1" },
  { label: "ap-southeast-3", value: "ap-southeast-3" },
  { label: "ap-southeast-2", value: "ap-southeast-2" },
  { label: "ap-southeast-1", value: "ap-southeast-1" },
  { label: "ap-south-2", value: "ap-south-2" },
  { label: "ap-south-1", value: "ap-south-1" },
  { label: "ap-northeast-3", value: "ap-northeast-3" },
  { label: "ap-northeast-2", value: "ap-northeast-2" },
  { label: "ap-northeast-1", value: "ap-northeast-1" },
  { label: "ap-east-1", value: "ap-east-1" },
  { label: "af-south-1", value: "af-south-1" },
];

export const services = {
  elasticComputeCloud: "Amazon Elastic Compute Cloud - Compute",
  relationalDB: "Amazon Relational Database Service",
  redshift: "Amazon Redshift",
  elastiCache: "Amazon ElastiCache",
  elasticSearch: "Amazon Elasticsearch Service",
  openSearch: "Amazon OpenSearch Service",
  memoryDB: "Amazon MemoryDB",
};

export const contractTypes = {
  elasticComputeCloud: "EC2 RI",
  relationalDB: "RDS RI",
  redshift: "Redshift RI",
  elastiCache: "ElastiCache RI",
  elasticSearch: "Elasticsearch RI",
  openSearch: "OpenSearch RI",
  memoryDB: "MemoryDB RI",
  computeSavingsPlan: "Compute SP",
};

export const scheduleOptions = [
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
];

export const weekdaysOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const daysArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

export const periodMap: { [key: string]: string } = {
  weekly: "week",
  monthly: "month",
  quarterly: "quarter",
};

export const frequency = [
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];

export const capitalizeDay = (day) => {
  if (!day) return "";
  return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
};

export const ordinalSuffix = (value) => {
  const num = parseInt(value, 10);
  if (isNaN(num)) return "";
  const suffix =
    num % 10 === 1 && num % 100 !== 11
      ? "st"
      : num % 10 === 2 && num % 100 !== 12
        ? "nd"
        : num % 10 === 3 && num % 100 !== 13
          ? "rd"
          : "th";
  return `${num}${suffix}`;
};

export const getFormattedTimestamp = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

export function convertPlannedBudgetLimits(
  plannedBudgetLimits: Record<string, { Amount: string; Unit: string }>,
) {
  const result: Record<string, { Amount: string; Unit: string }> = {};

  Object.entries(plannedBudgetLimits).forEach(([epochStr, value]) => {
    const epochMs = parseInt(epochStr, 10) * 1000;
    const date = new Date(epochMs);
    const monthYear = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }); // e.g., "Jul 2025"

    result[monthYear] = value;
  });

  return result;
}

export const convertPlannedBudgetLimitsToQuarters = (
  plannedLimits: Record<string, { Amount: string; Unit: string }>,
): Record<string, { Amount: string; Unit: string }> => {
  const result: Record<string, { Amount: string; Unit: string }> = {};

  Object.entries(plannedLimits).forEach(([epochString, value]) => {
    const date = new Date(Number(epochString) * 1000); // convert epoch seconds to ms
    const month = date.getUTCMonth(); // 0-based
    const year = date.getUTCFullYear();

    let quarter = "";
    if (month >= 0 && month <= 2) quarter = "Q1";
    else if (month >= 3 && month <= 5) quarter = "Q2";
    else if (month >= 6 && month <= 8) quarter = "Q3";
    else if (month >= 9 && month <= 11) quarter = "Q4";

    const key = `${quarter} ${year}`;
    result[key] = value;
  });

  return result;
};

export const getQuarterStartMonthIndex = (quarter: string): number => {
  switch (quarter) {
    case "Q1":
      return 0; // January
    case "Q2":
      return 3; // April
    case "Q3":
      return 6; // July
    case "Q4":
      return 9; // October
    default:
      throw new Error("Invalid quarter");
  }
};

export const getUTCDateString = (
  year: string,
  monthName: string,
  day: number,
  isEndMonth = false,
) => {
  const month = Number(monthMapping[monthName]) - (isEndMonth ? 0 : 1); // 0-based index for Date.UTC
  const utcDate = new Date(Date.UTC(Number(year), month, day));
  return utcDate.toISOString().split("T")[0] + "T00:00:00Z";
};

export const getQuarterFromMonth = (monthIndex: number): string => {
  if (monthIndex >= 0 && monthIndex <= 2) return "Q1";
  if (monthIndex >= 3 && monthIndex <= 5) return "Q2";
  if (monthIndex >= 6 && monthIndex <= 8) return "Q3";
  if (monthIndex >= 9 && monthIndex <= 11) return "Q4";
  throw new Error("Invalid month index");
};

export function formatNumberEightDigitsEightDigits(num: number) {
  return num.toFixed(8).replace(/\.?0+$/, "");
}

/**
 * Executes async tasks with limited concurrency
 *
 * @param tasks - Array of functions returning promises
 * @param concurrency - Max number of parallel executions
 * @param onProgress - Optional progress callback
 */
export async function batchExecutor<T>(
  tasks: Array<() => Promise<T>>,
  concurrency = 5,
  onProgress?: (completed: number, total: number) => void,
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;
  let completed = 0;

  const workers = new Array(concurrency).fill(null).map(async () => {
    while (true) {
      const currentIndex = index++;
      if (currentIndex >= tasks.length) break;

      try {
        results[currentIndex] = await tasks[currentIndex]();
      } finally {
        completed++;
        onProgress?.(completed, tasks.length);
      }
    }
  });

  await Promise.all(workers);
  return results;
}

export function extractFriendlyMessage(errorMessage) {
  if (!errorMessage) return null;

  const permission = errorMessage.match(
    /is not authorized to perform: ([^ ]+)/,
  );
  if (permission && permission[1]) {
    const matches = [
      ...errorMessage.matchAll(/arn:aws:sts::(\d{12}):/g),
      ...errorMessage.matchAll(/arn:aws:iam::(\d{12}):/g),
    ];
    const account = matches?.map((match) => match[1]);
    return account?.length === 1
      ? `You do not have the ${(permission && permission[1]) || "Unknown"} permission required for this action on account ${(account && account[0]) || "Unknown"}.`
      : `Your account (${account[0] || "Unknown"}) does not have the necessary ${permission && permission[1]} permission to assume the required role in account ${account[1] || "Unknown"}.`;
  }
  return null;
}

export type StatusResult = {
  allowData: boolean;
  infoMessages: string[];
  errorMessages: string[];
};

export const COMPUTE_OPTIMIZER_LINK_TOKEN = "__COMPUTE_OPTIMIZER_LINK__";
export const COST_OPTIMIZATION_HUB_LINK_TOKEN =
  "__COST_OPTIMIZATION_HUB_LINK_TOKEN__";
export const COMPUTE_ENABLE_LINK_TOKEN = "__COMPUTE_ENABLE_LINK__";
export const HUB_ENABLE_LINK_TOKEN = "__HUB_ENABLE_LINK__";

export const resolveCostOptimizationEnrollmentStatus = (data): StatusResult => {
  const compute = data?.computeOptimizer;
  const hub = data?.costOptimizationHub;

  const infoMessages: string[] = [];
  const errorMessages: string[] = [];

  // if (hub?.message || compute?.message) {
  //   if (hub?.message) {
  //     errorMessages.push(hub?.message);
  //   }
  //   if (compute?.message) {
  //     errorMessages.push(compute?.message);
  //   }
  //   return { allowData: false, infoMessages, errorMessages };
  // }

  // Scenario 7 – Both Cost Optimization Hub and Compute Optimizer are inactive
  if (hub.status === "Inactive" && compute.status === "Inactive") {
    errorMessages.push(
      "Cost Optimization Hub is not enabled for this account.",
      HUB_ENABLE_LINK_TOKEN,
      "Compute Optimizer is also disabled.",
      COMPUTE_ENABLE_LINK_TOKEN,
      "No cost optimization recommendations can be generated.",
      // COMPUTE_OPTIMIZER_LINK_TOKEN
    );
    return { allowData: false, infoMessages, errorMessages };
  }

  // Scenario 6 – Cost Optimization Hub active, Compute Optimizer inactive
  if (hub.status === "Active" && compute.status === "Inactive") {
    errorMessages.push(
      "Cost Optimization Hub is enabled.",
      "Compute Optimizer is not enabled. Without it, resource-level recommendations (EC2, EBS, Lambda) cannot be generated.",
      COMPUTE_ENABLE_LINK_TOKEN,
      // COMPUTE_OPTIMIZER_LINK_TOKEN
    );
    return { allowData: false, infoMessages, errorMessages };
  }

  // Scenario 5 – Cost Optimization Hub inactive, Compute Optimizer active
  if (hub.status === "Inactive" && compute.status === "Active") {
    errorMessages.push(
      "Cost Optimization Hub is not enabled.",
      HUB_ENABLE_LINK_TOKEN,
      "Compute Optimizer alone cannot provide organization-wide or linked account optimizations.",
      "Enable Cost Optimization Hub to receive consolidated recommendations.",
      // COMPUTE_OPTIMIZER_LINK_TOKEN
    );
    return { allowData: false, infoMessages, errorMessages };
  }

  // Scenario 4 – Cost Optimization Hub active, current account not enrolled
  if (hub.status === "Active" && !hub.currentAccountEnrollment) {
    errorMessages.push(
      "Cost Optimization Hub is enabled, but this account is not enrolled.",
      "Optimization recommendations for this account are unavailable.",
      // COMPUTE_OPTIMIZER_LINK_TOKEN
    );
    return { allowData: false, infoMessages, errorMessages };
  }

  // Scenario 3 – Cost Optimization Hub active, member accounts not fully included
  if (hub.status === "Active" && !hub?.includeMemberAccounts) {
    infoMessages.push(
      "Cost Optimization Hub is enabled, but not all member accounts are included.",
      COST_OPTIMIZATION_HUB_LINK_TOKEN,
    );
  }

  // Scenario 2 – Compute Optimizer active, member accounts not enrolled
  if (compute.status === "Active" && !compute.memberAccountsEnrolled) {
    infoMessages.push(
      "Compute Optimizer is enabled, but since member accounts are not enrolled, some linked account recommendations may be missing.",
      COMPUTE_OPTIMIZER_LINK_TOKEN,
    );
  }

  // Scenario 1, 2, 3 → allow data flow
  return {
    allowData: true,
    infoMessages,
    errorMessages,
  };
};
