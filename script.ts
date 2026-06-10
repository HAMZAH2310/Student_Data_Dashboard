// ============================================================
// Student Data Dashboard - TypeScript Version
// Day 1 Migration: JS → TS with strict typing
// ============================================================

// -----------------------------------------------------------
// Interface / Type Alias Definition
// -----------------------------------------------------------
export interface StudentType {
  name: string;
  class: string;
  score: number;
}

// -----------------------------------------------------------
// Mock Data — strictly typed as StudentType[]
// -----------------------------------------------------------
const students: StudentType[] = [
  { name: "Andi Saputra",    class: "Full Stack A",  score: 85 },
  { name: "Budi Santoso",    class: "Full Stack A",  score: 78 },
  { name: "Amanda Lestari",  class: "Full Stack B",  score: 92 },
  { name: "Nana Anggraini",  class: "Backend Core",  score: 88 },
  { name: "Eko Prasetyo",    class: "Backend Core",  score: 75 },
  { name: "Vina Amelia",     class: "Full Stack A",  score: 95 },
  { name: "Gilang Ramadhan", class: "Full Stack B",  score: 80 },
  { name: "Hani Fitriani",   class: "Backend Core",  score: 89 },
  { name: "Irfan Hakim",     class: "Full Stack B",  score: 70 },
  { name: "Joko Susilo",     class: "Backend Core",  score: 82 },
];

// -----------------------------------------------------------
// DOM Element References — narrowed with non-null assertion
// or proper null-checks to avoid TS2531 errors
// -----------------------------------------------------------
const tableBody = document.getElementById("student-table-body") as HTMLTableSectionElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const averageElement = document.getElementById("average-score") as HTMLElement;

// -----------------------------------------------------------
// Helper: return Tailwind badge classes based on score
// Parameter  : score  — number
// Return type: string (Tailwind class string)
// -----------------------------------------------------------
function getScoreBadgeClass(score: number): string {
  if (score >= 85) return "bg-green-100 text-green-800 border border-green-200 font-bold";
  if (score >= 75) return "bg-yellow-100 text-yellow-800 border border-yellow-200 font-bold";
  return "bg-red-100 text-red-800 border border-red-200 font-bold";
}

// -----------------------------------------------------------
// Main renderer
// Parameter  : filteredStudents — StudentType[]
// Return type: void
// -----------------------------------------------------------
function renderDashboard(filteredStudents: StudentType[]): void {
  if (filteredStudents.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="px-6 py-8 text-center text-gray-400 italic">
          Tidak ada data siswa yang cocok dengan pencarian.
        </td>
      </tr>
    `;
    averageElement.textContent = "0";
    return;
  }

  const rowsHTML: string = filteredStudents
    .map((student: StudentType, index: number): string => {
      return `
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 text-center font-medium text-gray-500">${index + 1}</td>
          <td class="px-6 py-4 font-semibold text-gray-900">${student.name}</td>
          <td class="px-6 py-4 text-center">
            <span class="bg-gray-500 text-white text-xs px-2.5 py-1 rounded-md font-medium tracking-wide">
              ${student.class}
            </span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="inline-block w-10 py-1 rounded text-center text-xs ${getScoreBadgeClass(student.score)}">
              ${student.score}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");

  tableBody.innerHTML = rowsHTML;

  const totalScore: number = filteredStudents.reduce(
    (accumulator: number, currentStudent: StudentType): number =>
      accumulator + currentStudent.score,
    0
  );

  const average: number = totalScore / filteredStudents.length;

  // averageElement.textContent expects string — explicit conversion
  averageElement.textContent =
    average % 1 === 0 ? String(average) : average.toFixed(1);
}

// -----------------------------------------------------------
// Event listener — InputEvent is narrowed correctly
// -----------------------------------------------------------
searchInput.addEventListener("input", (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const keyword: string = target.value.toLowerCase().trim();

  const filteredData: StudentType[] = students.filter(
    (student: StudentType): boolean =>
      student.name.toLowerCase().includes(keyword)
  );

  renderDashboard(filteredData);
});

// -----------------------------------------------------------
// Initial render
// -----------------------------------------------------------
renderDashboard(students);