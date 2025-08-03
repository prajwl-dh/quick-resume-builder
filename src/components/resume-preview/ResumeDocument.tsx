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
      <Page size='LETTER'>
        <View style={{ padding: 20 }}>
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

          {resume?.skills ? (
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Skills
              </Text>

              {resume.skills.split('\n').map((line, index) => {
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
                        <Text style={{ fontWeight: 'bold' }}>
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
        </View>
      </Page>
    </Document>
  );
}
