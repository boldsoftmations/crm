import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Login } from "./Login";
import {
  authorizeWorkPulse,
  workPulseOptions,
  getCRMLoginToken,
} from "../../services/WorkPulseAuthService";
import { removeUser } from "../../services/TokenService";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Action/Action";

function parameters(search) {
  const query = new URLSearchParams(search);
  const result = {};
  [
    "client_id",
    "redirect_uri",
    "state",
    "code_challenge",
    "code_challenge_method",
    "response_type",
    "scope",
  ].forEach((key) => {
    if (query.getAll(key).length !== 1)
      throw new Error(
        "Invalid or incomplete WorkPulse login link. Start again from the desktop agent.",
      );
    result[key] = query.get(key);
  });
  return result;
}
function callbackURL(value, params, issuer) {
  const url = new URL(value);
  const expected = new URL(params.redirect_uri);
  if (
    url.protocol !== "http:" ||
    url.hostname !== "127.0.0.1" ||
    url.origin !== expected.origin ||
    url.pathname !== "/crm/callback" ||
    url.searchParams.get("state") !== params.state ||
    url.searchParams.get("iss") !== issuer ||
    !url.searchParams.get("code")
  )
    throw new Error(
      "CRM returned an invalid desktop callback. Start login again.",
    );
  return url.href;
}
export default function WorkPulseAuthorize() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [options, setOptions] = useState(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const inFlight = useRef(false);
  const mounted = useRef(true);
  const generation = useRef(0);
  async function authorize(params, info, run) {
    if (inFlight.current === run) return;
    inFlight.current = run;
    setBusy(true);
    setError("");
    try {
      const response = await authorizeWorkPulse(params);
      if (!mounted.current || run !== generation.current) return;
      window.location.assign(
        callbackURL(response.data.redirect_url, params, info.issuer),
      );
    } catch (err) {
      if (!mounted.current || run !== generation.current) return;
      if (err.response && err.response.status === 401) {
        removeUser(); // Prevent the existing Axios interceptor attaching an expired JWT to password login.
        dispatch(logoutUser());
        setNeedsLogin(true);
      } else
        setError(
          (err.response &&
            err.response.data &&
            (err.response.data.detail || err.response.data.error)) ||
            err.message ||
            "CRM authorization failed.",
        );
    } finally {
      if (inFlight.current === run) inFlight.current = false;
      if (mounted.current && run === generation.current) setBusy(false);
    }
  }
  useEffect(() => {
    mounted.current = true;
    const run = ++generation.current;
    setOptions(null);
    setNeedsLogin(false);
    setError("");
    setBusy(true);
    let params;
    try {
      params = parameters(location.search);
    } catch (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    workPulseOptions(params)
      .then((response) => {
        if (!mounted.current || run !== generation.current) return;
        setOptions(response.data);
        if (getCRMLoginToken()) authorize(params, response.data, run);
        else {
          setNeedsLogin(true);
          setBusy(false);
        }
      })
      .catch((err) => {
        if (!mounted.current || run !== generation.current) return;
        setError(
          (err.response && err.response.data && err.response.data.detail) ||
            "This WorkPulse login request could not be validated.",
        );
        setBusy(false);
      });
    return () => {
      mounted.current = false;
    };
  }, [location.search]);
  function continueLogin() {
    setNeedsLogin(false);
    authorize(parameters(location.search), options, generation.current);
  }
  return (
    <section style={{ maxWidth: 520, margin: "60px auto", padding: 24 }}>
      <h2>Login to BOLD WorkPulse</h2>
      {options && (
        <p>
          Continue from {options.company_name || "your CRM"} to{" "}
          {options.client_name}.
        </p>
      )}
      {busy && <p role="status">Verifying your CRM login…</p>}
      {error && <p role="alert">{String(error)}</p>}
      {needsLogin && options && (
        <>
          <p>Sign in to CRM to continue to the desktop agent.</p>
          <Login onSuccess={continueLogin} />
        </>
      )}
      {!busy && error && options && !needsLogin && (
        <button onClick={continueLogin}>Try again</button>
      )}
      <p>You can close this tab and cancel login in the desktop agent.</p>
    </section>
  );
}
