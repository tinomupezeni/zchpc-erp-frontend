import Employees from "@/components/HR/employees/Employees";
import Attendance from "@/components/HR/Attendence";
import Recruitment from "@/components/HR/Recruitment";
import PayrollDashboard from "@/components/Payroll/PayrollDashboard";
import PayslipGeneration from "@/components/Payroll/PayslipGeneration";

// HRPage.tsx
interface PayrollProps {
  openTab: string;
}

const PayrollPage = ({openTab} :PayrollProps) => {
  const renderContent = () => {
    switch (openTab){
      case '#payroll-setup':
        return <PayrollDashboard />
      case '#payroll-payslips':
        return <PayslipGeneration />
      case '#payroll-contributions':
        return <Recruitment />
      default :
       return <PayrollDashboard />
    }
  }
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">
            Manage employees' salaries, bonuses, etc
          </p>
        </div>
        <div className="flex items-center space-x-2">
          
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default PayrollPage;
