import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

Font.register({
  family: 'Roboto',
  src: '/Roboto.ttf',
});

export default function ResumeDocument({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <Document>
      <Page size='LETTER' style={{ padding: 20 }}>
        <View>
          {/* Profile Section */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '10px',
            }}
          >
            <Text
              style={{
                fontWeight: '800',
                fontSize: '14px',
              }}
            >
              {resume?.profile.fullName}
            </Text>
            {resume?.profile.intro ? (
              <Text
                style={{
                  fontSize: '10px',
                  marginTop: '2px',
                  fontWeight: '300',
                }}
              >
                {resume?.profile.intro}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: '2px',
              columnGap: '10px',
              fontSize: '10px',
              fontWeight: '300',
              marginBottom: '20px',
            }}
          >
            {resume?.profile.email ? (
              <Text style={{ textDecoration: 'underline', color: '#0563c1' }}>
                {resume?.profile.email}
              </Text>
            ) : null}

            {resume?.profile.phone ? (
              <Text>{resume?.profile.phone}</Text>
            ) : null}

            {resume?.profile.location ? (
              <Text>{resume?.profile.location}</Text>
            ) : null}

            {resume?.profile.website ? (
              <Text style={{ textDecoration: 'underline', color: '#0563c1' }}>
                {resume?.profile.website}
              </Text>
            ) : null}

            {resume?.profile.linkedIn ? (
              <Text style={{ textDecoration: 'underline', color: '#0563c1' }}>
                {resume?.profile.linkedIn}
              </Text>
            ) : null}

            {resume?.profile.gitHub ? (
              <Text style={{ textDecoration: 'underline', color: '#0563c1' }}>
                {resume?.profile.gitHub}
              </Text>
            ) : null}

            {resume?.profile?.profileCustomField
              ? resume?.profile?.profileCustomField.map((field, index) => {
                  return <Text key={index}>{field.fieldValue}</Text>;
                })
              : null}
          </View>

          {resume?.profile?.summary ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}
            >
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Professional Summary
              </Text>

              {resume.profile.summary.split('\n').map((line, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 10,
                    fontWeight: 300,
                    marginBottom: line.trim() === '' ? 6 : 6,
                    lineHeight: 1.4,
                  }}
                >
                  {line.trim()}
                </Text>
              ))}
            </View>
          ) : null}

          {/* Skills Section */}
          {resume?.skills ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}
            >
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Skills
              </Text>

              {resume.skills.split('\n\n').map((line, index) => {
                const [beforeColon, afterColon] = line.split(':');

                return (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      fontWeight: 300,
                      marginBottom: 6,
                      lineHeight: 1.4,
                      marginLeft: 5,
                    }}
                  >
                    •{' '}
                    {afterColon !== undefined ? (
                      <>
                        <Text style={{ fontWeight: '600' }}>
                          {beforeColon.trim()}:
                        </Text>{' '}
                        {afterColon.trim()}
                      </>
                    ) : (
                      line.trim()
                    )}
                  </Text>
                );
              })}
            </View>
          ) : null}

          {/* Work Experience Section */}
          {resume?.experience && resume?.experience?.length > 0 ? (
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Work Experience
              </Text>

              <View
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {resume.experience.map((workExperience, index) => (
                  <View
                    key={index}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 300,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <View
                        style={{
                          fontWeight: 600,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Text>{workExperience.companyName}</Text>
                        <Text>{workExperience.jobTitle}</Text>
                        {workExperience.jobDescription && (
                          <Text
                            style={{ marginTop: '5px', marginBottom: '5px' }}
                          >
                            Responsibilities :{' '}
                          </Text>
                        )}
                      </View>
                      <View style={{ fontWeight: 600 }}>
                        <Text>{workExperience.jobDate}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 300,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {workExperience.jobDescription &&
                        workExperience.jobDescription
                          .split('\n\n')
                          .map((line, index) => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  fontSize: 10,
                                  fontWeight: 300,
                                  marginBottom: 6,
                                  lineHeight: 1.4,
                                  marginLeft: 5,
                                }}
                              >
                                • <Text>{line}</Text>
                              </Text>
                            );
                          })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Education Section */}
          {resume?.education && resume?.education?.length > 0 ? (
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Education
              </Text>

              <View
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {resume.education.map((resumeEducation, index) => (
                  <View
                    key={index}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 300,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <View
                        style={{
                          fontWeight: 600,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Text>{resumeEducation.schoolName}</Text>
                        <Text>{resumeEducation.schoolMajor}</Text>
                        <Text>
                          {resumeEducation.schoolGPA
                            ? `GPA : ${resumeEducation.schoolGPA}`
                            : null}
                        </Text>
                        {resumeEducation.schoolDescription && (
                          <Text
                            style={{ marginTop: '5px', marginBottom: '5px' }}
                          >
                            Highlights :{' '}
                          </Text>
                        )}
                      </View>
                      <View style={{ fontWeight: 600 }}>
                        <Text>{resumeEducation.schoolDate}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 300,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {resumeEducation.schoolDescription &&
                        resumeEducation.schoolDescription
                          .split('\n\n')
                          .map((line, index) => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  fontSize: 10,
                                  fontWeight: 300,
                                  marginBottom: 6,
                                  lineHeight: 1.4,
                                  marginLeft: 5,
                                }}
                              >
                                • <Text>{line}</Text>
                              </Text>
                            );
                          })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Projects Section */}
          {resume?.projects && resume?.projects?.length > 0 ? (
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Projects
              </Text>

              <View
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {resume.projects.map((project, index) => (
                  <View
                    key={index}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: 600 }}>
                      {project.projectName}
                    </Text>
                    {project.projectDescription && (
                      <Text style={{ fontSize: 10, fontWeight: 600 }}>
                        Description :
                      </Text>
                    )}

                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '5px',
                      }}
                    >
                      {project.projectDescription &&
                        project.projectDescription
                          .split('\n\n')
                          .map((line, index) => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  fontSize: 10,
                                  fontWeight: 300,
                                  marginBottom: 6,
                                  lineHeight: 1.4,
                                  marginLeft: 5,
                                }}
                              >
                                • <Text>{line}</Text>
                              </Text>
                            );
                          })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
