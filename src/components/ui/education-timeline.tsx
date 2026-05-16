import React from "react";

interface EducationItem {
  title: string;
  org: string;
  date: string;
  badge?: string;
  color: keyof typeof colorMap;
  year: number;
}

// Expected education data format:
// [
//   {
//     title: "AWS Certified Developer",
//     org: "Amazon Web Services",
//     date: "Jan 2024",
//     badge: "Associate Level",
//     color: "purple", // for card dot + gradient
//     year: 2024
//   }
// ]

const colorMap = {
  purple: {
    dot: "bg-purple-500",
    border: "border-purple-200",
    gradient: "from-purple-50 to-pink-50",
  },
  blue: {
    dot: "bg-blue-500",
    border: "border-blue-200",
    gradient: "from-blue-50 to-indigo-50",
  },
  green: {
    dot: "bg-green-500",
    border: "border-green-200",
    gradient: "from-green-50 to-emerald-50",
  },
  amber: {
    dot: "bg-amber-500",
    border: "border-amber-200",
    gradient: "from-amber-50 to-orange-50",
  },
  cyan: {
    dot: "bg-cyan-500",
    border: "border-cyan-200",
    gradient: "from-cyan-50 to-blue-50",
  },
};

const Timeline: React.FC<{ educations: EducationItem[] }> = ({
  educations,
}) => {
  const grouped = educations.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const sortedYears = Object.keys(grouped).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-500" />

      <div className="space-y-12">
        {sortedYears.map((year) => (
          <React.Fragment key={year}>
            {/* Year Label */}
            <div className="relative flex justify-center">
              <div className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg z-10">
                {year}
              </div>
            </div>

            {/* Items */}
            {grouped[year].map((item, index) => {
              const isLeft = index % 2 === 1;
              const c = colorMap[item.color] || colorMap.blue;
              return (
                <div
                  key={item.title + index}
                  className="relative grid grid-cols-2 gap-8 items-center">
                  {/* Left or right depending on index */}
                  {isLeft ? (
                    <div className="col-start-1 text-right">
                      <Card item={item} c={c} align="right" />
                    </div>
                  ) : (
                    <div className="col-start-1"></div>
                  )}

                  {!isLeft ? (
                    <div className="col-start-2">
                      <Card item={item} c={c} align="left" />
                    </div>
                  ) : (
                    <div className="col-start-2"></div>
                  )}

                  {/* Dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 ${c.dot}`}
                  />
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  item: EducationItem;
  c: { dot: string; border: string; gradient: string };
  align: "left" | "right";
}

const Card: React.FC<CardProps> = ({ item, c, align }) => (
  <div
    className={`bg-gradient-to-br ${c.gradient} rounded-lg p-6 ${c.border} border-2 shadow-md hover:shadow-xl transition-all duration-300`}>
    <div
      className={`flex items-start justify-between mb-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
      <span className="text-sm text-gray-600 font-medium whitespace-nowrap mx-2">
        {item.date}
      </span>
    </div>
    <p
      className={`text-gray-700 font-medium mb-3 ${align === "right" ? "text-right" : ""}`}>
      {item.org}
    </p>
    {item.badge && (
      <div className={`${align === "right" ? "flex justify-end" : ""}`}>
        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700">
          {item.badge}
        </span>
      </div>
    )}
  </div>
);

export default Timeline;
