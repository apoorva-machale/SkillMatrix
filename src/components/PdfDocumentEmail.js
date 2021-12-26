import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

const PDFDownloadEmail = (props) => {
  console.log("pdf props", props.data);
  const { data } = props;
  const { skills } = data;
  // const [skillpdf, setPdf] = useState([]);
  const isArray = Array.isArray(data);
  // const sk = [
  //   {
  //     skills: {
  //       primary_skills: [],
  //       secondary_skills: [
  //         {
  //           name: "react",
  //           rating: 5,
  //         },
  //         {
  //           name: "java",
  //           rating: 5,
  //         },
  //         {
  //           name: ".net",
  //           rating: 5,
  //         },
  //         {
  //           name: "angular",
  //           rating: 5,
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     skills: {
  //       primary_skills: [
  //         {
  //           name: "react",
  //           rating: 5,
  //         },
  //         {
  //           name: "java",
  //           rating: 5,
  //         },
  //         {
  //           name: ".net",
  //           rating: 5,
  //         },
  //         {
  //           name: "angular",
  //           rating: 5,
  //         },
  //       ],
  //       secondary_skills: [
  //         {
  //           name: "react",
  //           rating: 5,
  //         },
  //         {
  //           name: "java",
  //           rating: 5,
  //         },
  //         {
  //           name: ".net",
  //           rating: 5,
  //         },
  //         {
  //           name: "angular",
  //           rating: 5,
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     email: "asss00",
  //     kibo_team: "wmmmm",
  //     skills: {
  //       primary_skills: [
  //         {
  //           name: "react",
  //           rating: 5,
  //         },
  //         {
  //           name: "java",
  //           rating: 5,
  //         },
  //         {
  //           name: ".net",
  //           rating: 5,
  //         },
  //         {
  //           name: "angular",
  //           rating: 5,
  //         },
  //       ],
  //       secondary_skills: [],
  //     },
  //   },
  //   { email: "asss00", kibo_team: "wmmmm", skills: {} },
  // ];
  // const skillpdf = data.filter((user) => {
  //   return Object.keys(user.skills).length !== 0;
  // });

  // console.log("object", skillpdf);

  return (
    <Document>
      <Page>
        <View>
          <Text>Data</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Email</Text>
              </View>
              {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>First Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Last Name</Text>
              </View> */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Kibo Team</Text>
              </View>
              {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Skill Type</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Skill Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Skill Rating</Text>
              </View> */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Primary Skills </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Primary Rating</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Secondary Skills </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Secondary Rating</Text>
              </View>
            </View>

            {isArray && data ? (
              data.map((a, index) => {
                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{a.email}</Text>
                    </View>
                    {/* <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{a.first_name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{a.last_name}</Text>
                    </View> */}
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{a.kibo_team}</Text>
                    </View>
                    {/* <View style={styles.tableCol}>
                      {a.skills &&
                        a.skills.primary_skills.map((user) => {
                          return <Text style={styles.tableCell}>primary</Text>;
                        })}
                    </View> */}
                    <View style={styles.tableCol}>
                      {a.skills &&
                        a.skills.primary_skills.map((row, index) => {
                          return (
                            <Text style={styles.tableCell}>{row.name}</Text>
                          );
                        })}
                    </View>
                    <View style={styles.tableCol}>
                      {a.skills &&
                        a.skills.primary_skills.map((row, index) => {
                          return (
                            <Text style={styles.tableCell}>{row.rating}</Text>
                          );
                        })}
                    </View>

                    <View style={styles.tableCol}>
                      {a.skills &&
                        a.skills.secondary_skills.map((row, index) => {
                          return (
                            <Text style={styles.tableCell}>{row.name}</Text>
                          );
                        })}
                    </View>
                    <View style={styles.tableCol}>
                      {a.skills &&
                        a.skills.secondary_skills.map((row, index) => {
                          return (
                            <Text style={styles.tableCell}>{row.rating}</Text>
                          );
                        })}
                    </View>
                  </View>
                );
              })
            ) : props.data ? (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{props.data.email}</Text>
                </View>
                {/* <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{props.data.first_name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{props.data.last_name}</Text>
                </View> */}
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{props.data.kibo_team}</Text>
                </View>
                <View style={styles.tableCol}>
                  {skills &&
                    skills.primary_skills.map((row, index) => {
                      return <Text style={styles.tableCell}>{row.name}</Text>;
                    })}
                </View>
                <View style={styles.tableCol}>
                  {skills &&
                    skills.primary_skills.map((row, index) => {
                      return <Text style={styles.tableCell}>{row.rating}</Text>;
                    })}
                </View>
                <View style={styles.tableCol}>
                  {skills &&
                    skills.secondary_skills.map((row, index) => {
                      return <Text style={styles.tableCell}>{row.name}</Text>;
                    })}
                </View>
                <View style={styles.tableCol}>
                  {skills &&
                    skills.secondary_skills.map((row, index) => {
                      return <Text style={styles.tableCell}>{row.rating}</Text>;
                    })}
                </View>
              </View>
            ) : (
              ""
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDownloadEmail;
