# Clean-machine beta validation

This is the shortest useful test of what a new FifthDev user receives. It is
deliberately written so results from an old MCP process, retained conversation,
or development checkout do not get mistaken for the published beta.

## Use a clean environment

Prefer a new operating-system user, disposable VM, or machine that has never run
Fabric. Use a small disposable git project rather than a private production
repository for the first test.

Do not uninstall another user's setup, delete `~/.fabric`, clear an OS keychain,
or reuse an old agent conversation just to make the test look clean.

Record:

```bash
node --version
npm view @cognisos/fabric-mcp@beta-candidate version dist.shasum dist.integrity
```

Node.js must be 20.18.1 or newer.

## Install

Run from the disposable project:

```bash
npx -y @cognisos/fabric-mcp@beta-candidate setup
```

The browser authorization must load, sign-in must complete, and the terminal
must receive the callback. Do not manually rewrite the generated callback URL
or connector registration.

Then run:

```bash
npx -y @cognisos/fabric-mcp@beta-candidate doctor
```

Keep the sanitized output. A passing setup should not require recursive
permissions changes, manual keychain surgery, or deleting Fabric state.

## Remove retained-session ambiguity

1. Fully quit the MCP client being tested.
2. Confirm no old Fabric/Indexer process is being reused accidentally.
3. Restart exactly one client.
4. Open a brand-new conversation.
5. Ask the agent to list the Fabric, Fractal, and Shared Fabric tools it can see.

Installing a package does not replace the tool list already held by an existing
conversation.

## Exercise real value

Use a small project containing a few functions, one interface, one caller, and a
test. Ask the agent to:

1. report Fabric status and freshness;
2. find a deliberately misspelled or partial symbol name;
3. explain what calls that symbol and what could break if it changes;
4. return a bounded slice of relevant context;
5. find the interface or contract implemented by the symbol;
6. add a small file, wait for the watcher, and prove the new symbol becomes
   queryable without a manual reindex command;
7. restart the client and prove the same project identity and useful results are
   still available;
8. begin and finish one Fractal session, then verify the next new conversation
   can recover the intentionally recorded decision.

Record positive results as well as failures. An empty response or denied action
is not proof unless a corresponding positive control worked first.

## Report a failure

Open a [GitHub issue](https://github.com/cognisos-ai/5thDev/issues) with:

- package version and registry integrity;
- operating system and architecture;
- Node.js version;
- the exact command that failed;
- the last successful stage;
- sanitized `doctor` output;
- whether the client and conversation were newly restarted.

Never attach API keys, OAuth codes, bearer tokens, keychain contents, private
source, full environment dumps, or unredacted registration files.
