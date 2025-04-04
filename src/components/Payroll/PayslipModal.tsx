import { Download } from "lucide-react";
import { format } from 'date-fns';

export default function PayslipModal({PayrollRecord, setShowPayslip}) {
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
                    {PayrollRecord.employee.name}
                  </p>
                  <p>
                    <span className="text-gray-500">Position:</span>{" "}
                    {PayrollRecord.employee.position}
                  </p>
                  <p>
                    <span className="text-gray-500">Department:</span>{" "}
                    {PayrollRecord.employee.department}
                  </p>
                  <p>
                    <span className="text-gray-500">Employee ID:</span>{" "}
                    {PayrollRecord.employee.employeeId}
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
                    = {PayrollRecord.salary.exchangeRate} ZIG
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
                  <tr>
                    <td className="px-6 py-4 text-sm">Base Salary</td>
                    <td className="px-6 py-4 text-sm text-right">
                      ${PayrollRecord.salary.baseSalaryUSD.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {PayrollRecord.salary.baseSalaryZIG.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 text-sm font-medium">Benefits</td>
                    <td colSpan={2}></td>
                  </tr>
                  {Object.entries(PayrollRecord.salary.benefits).map(
                    ([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 text-sm pl-10">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          ${value.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          {(value * PayrollRecord.salary.exchangeRate).toFixed(
                            2
                          )}
                        </td>
                      </tr>
                    )
                  )}
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 text-sm font-medium">
                      Deductions
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                  {Object.entries(PayrollRecord.salary.deductions).map(
                    ([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 text-sm pl-10">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          -${value.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          -
                          {(value * PayrollRecord.salary.exchangeRate).toFixed(
                            2
                          )}
                        </td>
                      </tr>
                    )
                  )}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-6 py-4 text-sm">Net Salary</td>
                    <td className="px-6 py-4 text-sm text-right">
                      ${PayrollRecord.salary.netSalaryUSD.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {PayrollRecord.salary.netSalaryZIG.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Net Pay (USD)</p>
                  <p className="text-2xl font-bold">
                    ${PayrollRecord.salary.netSalaryUSD.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Pay (ZIG)</p>
                  <p className="text-2xl font-bold">
                    {PayrollRecord.salary.netSalaryZIG.toFixed(2)}
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
