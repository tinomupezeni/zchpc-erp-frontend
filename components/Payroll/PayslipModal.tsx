import { Download } from "lucide-react";
import { format } from "date-fns";
import { formatUSD, formatZIG } from "../ui/utils";

export default function PayslipModal({ PayrollRecord, setShowPayslip }) {
  // Mock additions (earnings)
  const additions = [
    {
      name: "Housing Allowance",
      usd: 500,
      zig: 500 * PayrollRecord.exchange_rate,
    },
    {
      name: "Transport Allowance",
      usd: 200,
      zig: 200 * PayrollRecord.exchange_rate,
    },
    {
      name: "Performance Bonus",
      usd: 750,
      zig: 750 * PayrollRecord.exchange_rate,
    },
    { name: "Overtime Pay", usd: 320, zig: 320 * PayrollRecord.exchange_rate },
  ];

  // Mock deductions
  const deductions = [
    { name: "Income Tax", usd: 350, zig: 350 * PayrollRecord.exchange_rate },
    {
      name: "Social Security",
      usd: 180,
      zig: 180 * PayrollRecord.exchange_rate,
    },
    {
      name: "Health Insurance",
      usd: 120,
      zig: 120 * PayrollRecord.exchange_rate,
    },
    {
      name: "Loan Deduction",
      usd: 200,
      zig: 200 * PayrollRecord.exchange_rate,
    },
  ];

  // Calculate totals
  const totalAdditionsUSD = additions.reduce((sum, item) => sum + item.usd, 0);
  const totalAdditionsZIG = additions.reduce((sum, item) => sum + item.zig, 0);
  const totalDeductionsUSD = deductions.reduce(
    (sum, item) => sum + item.usd,
    0
  );
  const totalDeductionsZIG = deductions.reduce(
    (sum, item) => sum + item.zig,
    0
  );

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Payslip</h2>
              <div className="flex gap-4">
                <button
                  onClick={setShowPayslip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Employee Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-500">Name:</span>{" "}
                    {PayrollRecord.employee_name}
                  </p>
                  <p>
                    <span className="text-gray-500">Employee ID:</span>{" "}
                    {PayrollRecord.employee_id}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-500">Period:</span>{" "}
                    {PayrollRecord.period}
                  </p>
                  <p>
                    <span className="text-gray-500">Payment Date:</span>{" "}
                    {format(new Date(), "MMMM dd, yyyy")}
                  </p>
                  <p>
                    <span className="text-gray-500">Exchange Rate:</span> 1 USD
                    = {PayrollRecord.exchange_rate} ZIG
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      USD
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      ZIG
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Base Salary */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">
                      Basic Salary
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {formatUSD(PayrollRecord.base_salary_usd)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {formatZIG(PayrollRecord.base_salary_zig)}
                    </td>
                  </tr>

                  {/* Additions Section */}
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 text-sm font-medium">Additions</td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      {formatUSD(totalAdditionsUSD.toFixed(2))}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      {formatZIG(totalAdditionsZIG.toFixed(2))}
                    </td>
                  </tr>
                  {additions.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm pl-10">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-right text-green-600">
                        +{formatUSD(item.usd.toFixed(2))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-green-600">
                        +{formatZIG(item.zig.toFixed(2))}
                      </td>
                    </tr>
                  ))}

                  {/* Deductions Section */}
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 text-sm font-medium">
                      Deductions
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      -{formatUSD(totalDeductionsUSD.toFixed(2))}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      -{formatZIG(totalDeductionsZIG.toFixed(2))}
                    </td>
                  </tr>
                  {deductions.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm pl-10">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-right text-red-600">
                        -{formatUSD(item.usd.toFixed(2))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-red-600">
                        -{formatZIG(item.zig.toFixed(2))}
                      </td>
                    </tr>
                  ))}

                  {/* Gross Pay */}
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 text-sm font-medium">Gross Pay</td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      {formatUSD(
                        PayrollRecord.base_salary_usd + totalAdditionsUSD
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium">
                      {formatZIG(PayrollRecord.base_salary_zig)}
                    </td>
                  </tr>

                  {/* Net Salary */}
                  <tr className="bg-gray-100 font-medium border-t-2 border-gray-300">
                    <td className="px-6 py-4 text-sm">Net Salary</td>
                    <td className="px-6 py-4 text-sm text-right">
                      {formatUSD(PayrollRecord.net_salary_usd)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {formatZIG(PayrollRecord.net_salary_zig)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gross Pay (USD)</p>
                  <p className="text-xl font-bold">
                    {formatUSD(
                      PayrollRecord.base_salary_usd + totalAdditionsUSD
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Total Deductions (USD)
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    -{formatUSD(totalDeductionsUSD)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Pay (USD)</p>
                  <p className="text-2xl font-bold">
                    {formatUSD(PayrollRecord.net_salary_usd)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gross Pay (ZiG)</p>
                  <p className="text-xl font-bold">
                    {formatZIG(PayrollRecord.base_salary_zig)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Total Deductions (ZiG)
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    -{formatZIG(totalDeductionsZIG)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Pay (ZiG)</p>
                  <p className="text-2xl font-bold">
                    {formatZIG(PayrollRecord.net_salary_zig)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
