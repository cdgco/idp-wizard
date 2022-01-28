import React, { useEffect, useRef, useState } from "react";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ExpandableRowContent,
} from "@patternfly/react-table";
import { getEventData, IDashboardEvents } from "@app/services/DashboardData";
import { Flex, FlexItem, Spinner } from "@patternfly/react-core";

export function ActivityLog() {
  const columns = ["Time", "User", "Event Type", "Details"];
  const [activityData, setActivityData] = useState<IDashboardEvents[] | []>([]);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>(
    []
  );
  const setRepoExpanded = (entry: IDashboardEvents, isExpanding = true) =>
    setExpandedRepoNames((prevExpanded) => {
      const otherExpandedRepoNames = prevExpanded.filter(
        (r) => r !== `${entry.id}_${entry.time}`
      );
      return isExpanding
        ? [...otherExpandedRepoNames, `${entry.id}_${entry.time}`]
        : otherExpandedRepoNames;
    });
  const isRepoExpanded = (entry: IDashboardEvents) =>
    expandedRepoNames.includes(`${entry.id}_${entry.time}`);

  useEffect(() => {
    isMounted.current = true;
    getEventData().then((res) => {
      if (isMounted.current) {
        setActivityData(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TableComposable
      aria-label="Misc table"
      className="card-shadow"
      variant="compact"
    >
      <Thead noWrap>
        <Tr>
          <Th />
          <Th>{columns[0]}</Th>
          <Th>{columns[1]}</Th>
          <Th>{columns[2]}</Th>
        </Tr>
      </Thead>
      {loading ? (
        <Tbody>
          <Tr>
            <Td colSpan={4} textCenter>
              <div className="pf-u-display-flex pf-u-justify-content-center pf-u-py-lg">
                <Spinner isSVG size="lg" />{" "}
                <span className="pf-u-ml-lg">Loading Activity Data...</span>
              </div>
            </Td>
          </Tr>
        </Tbody>
      ) : (
        activityData.map((row, rowIndex) => {
          let dt = new Date(row.time);
          return (
            <Tbody key={rowIndex}>
              <Tr>
                <Td
                  expand={
                    row.details
                      ? {
                          rowIndex,
                          isExpanded: isRepoExpanded(row),
                          onToggle: () =>
                            setRepoExpanded(row, !isRepoExpanded(row)),
                        }
                      : undefined
                  }
                />
                <Td style={{ whiteSpace: "nowrap" }}>
                  {dt.toLocaleDateString()} {dt.toLocaleTimeString()}
                </Td>
                <Td style={{}}>{row.user}</Td>
                <Td style={{}}>{row.eventType}</Td>
              </Tr>
              <Tr isExpanded={isRepoExpanded(row)}>
                <Td />
                <Td colSpan={3}>
                  <ExpandableRowContent>
                    <pre>{JSON.stringify(row.details, null, 2)}</pre>
                  </ExpandableRowContent>
                </Td>
              </Tr>
            </Tbody>
          );
        })
      )}
    </TableComposable>
  );
}
