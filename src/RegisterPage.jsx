/*
Copyright 2021 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { useCallback, useRef } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Header, LeftNav } from "./Header";
import { FieldRow, InputField, Button } from "./Input";
import { Center, Content, Info, Modal } from "./Layout";

export function RegisterPage({ onRegister, error }) {
  const registerUsernameRef = useRef();
  const registerPasswordRef = useRef();
  const history = useHistory();
  const location = useLocation();

  const onSubmitRegisterForm = useCallback(
    (e) => {
      e.preventDefault();
      onRegister(
        registerUsernameRef.current.value,
        registerPasswordRef.current.value,
        () => {
          if (location.state && location.state.from) {
            history.replace(location.state.from);
          } else {
            history.replace("/");
          }
        }
      );
    },
    [onRegister, location, history]
  );

  return (
    <>
      <Header>
        <LeftNav />
      </Header>
      <Content>
        <Center>
          <Modal>
            <h2>Register</h2>
            <form onSubmit={onSubmitRegisterForm}>
              <FieldRow>
                <InputField
                  type="text"
                  ref={registerUsernameRef}
                  placeholder="Username"
                  label="Username"
                />
              </FieldRow>
              <FieldRow>
                <InputField
                  type="password"
                  ref={registerPasswordRef}
                  placeholder="Password"
                  label="Password"
                />
              </FieldRow>
              {error && (
                <FieldRow>
                  <ErrorMessage>{error.message}</ErrorMessage>
                </FieldRow>
              )}
              <FieldRow rightAlign>
                <Button type="submit">Register</Button>
              </FieldRow>
            </form>
            <Info>
              Already have an account?{" "}
              <Link
                to={{
                  pathname: "/login",
                  state: location.state,
                }}
              >
                Sign in here
              </Link>
            </Info>
          </Modal>
        </Center>
      </Content>
    </>
  );
}
