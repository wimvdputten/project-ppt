import React, {useState} from 'react';
import {format, subHours, startOfMonth} from 'date-fns';
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
} from '@zach.codes/react-calendar';
import {useQuery} from "@apollo/client";
import EmployeesQuery from "../graphql/queries/Employees";


const Calender = () => {
  const {data: employees} = useQuery(EmployeesQuery);

  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  function getDateArray(start: Date, end: Date) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }


  function formatEvents(): { title: string, date: Date }[] {
    const items: { title: string, date: Date }[] = []
    if (employees && employees.employees) {
      for (const employee of employees.employees) {
        const certificates = employee.certificates
        if (certificates) {
          for (const certificate of certificates) {
            const parsed = {
              title: `${certificate.title} vervalt van ${employee.firstName} ${employee.lastName}`,
              date: new Date(certificate.expirationDate)
            }
            items.push(parsed);
          }
        }
        const vacations = employee.vacations
        if (vacations) {
          for (const vacation of vacations) {
            const array = getDateArray(new Date(vacation.startDate), new Date(vacation.endDate));
            for (const date of array) {
              const parsed = {
                vacation: true,
                title: `${vacation.description}, ${employee.firstName} ${employee.lastName}`,
                date: new Date(date)
              }
              items.push(parsed);
            }
          }
        }

      }
    }

    return items;
  }

  // @ts-ignore
  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={date => setCurrentMonth(date)}
    >
      <MonthlyNav/>
      <MonthlyBody
        events={formatEvents()}
      >
        <MonthlyDay<any>
          renderDay={data =>
            data.map((item, index) => {
              if (item.vacation) {
                return (
                  <li className="py-2" key={index}>
                    <div className="flex text-sm flex-1 justify-between">
                      <h3 className="font-medium text-blue-500">{item.title}</h3>
                    </div>
                  </li>
                )
              }
              return (
                <li className="py-2" key={index}>
                  <div className="flex text-sm flex-1 justify-between">
                    <h3 className="font-medium text-red-500">{item.title}</h3>
                  </div>
                </li>
              )
            })
          }
        />
      </MonthlyBody>
    </MonthlyCalendar>
  );
};

export default Calender;
