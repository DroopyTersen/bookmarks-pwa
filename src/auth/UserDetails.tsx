import React from "react";
import { useAuth } from "reactfire";
import { IonItem, IonAvatar, IonCardTitle, IonCardContent, IonCard, IonButton } from "@ionic/react";
import styled from "styled-components";
import BackgroundImage from "components/BackgroundImage/BackgroundImage";
import Splash from "components/Splash/Splash";
import Card from "components/primitives/Card";
import useNavigation from "navigation/useNavigation";

export default function UserDetails({ user }: { user: firebase.User }) {
  const auth = useAuth();
  const { navigate } = useNavigation();
  const signOut = async () => {
    await auth().signOut();
    console.log("SIgned out");
    navigate("/login");
  };
  return (
    <StyledContainer>
      <Splash
        className="profile"
        title={user.displayName}
        subtitle="Hey, whats up"
        image={user.photoURL}
        imageSize="150px"
        fontSize="42px"
      />
      <Card>
        <IonCardContent>
          <IonCardTitle color="secondary">Sign In Providers</IonCardTitle>
          <ul>
            {user.providerData.map((profile) => (
              <li key={profile.providerId}>{profile.providerId}</li>
            ))}
          </ul>
          <IonButton fill="outline" expand="block" onClick={() => signOut()}>
            Sign Out
          </IonButton>
        </IonCardContent>
      </Card>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;
const Avatar = styled(BackgroundImage)`
  border: 2px solid var(--white);
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
