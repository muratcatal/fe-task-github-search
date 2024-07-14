import { useAppContext } from '@intenseye/context';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  Link,
  Modal,
  ModalDialog,
  Tooltip,
} from '@mui/joy';
import { useSelector } from '@xstate/react';
import { useRef, useState } from 'react';

export const GithubApiKeySettings = () => {
  const context = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isPanelOpened, setIsPanelOpened] = useState(false);

  const githubApiKey = useSelector(context, (state) => {
    return state.context.githubApiKey;
  });

  const handleSaveGithubApiKeyClicked = () => {
    context.send({
      type: 'set_github_api_key',
      value: inputRef.current?.value,
    });

    setIsPanelOpened(false);
  };

  return (
    <div>
      <Tooltip title="Github API key settings">
        <Button
          onClick={() => setIsPanelOpened(true)}
          size="sm"
          variant="plain"
        >
          <SettingsIcon />
        </Button>
      </Tooltip>
      <Modal open={isPanelOpened} onClose={() => setIsPanelOpened(false)}>
        <ModalDialog>
          <DialogTitle>Github API key</DialogTitle>
          <DialogContent>
            <div>
              To avoid getting stuck by rate limits when making Github API
              calls, please enter your API key. You can create a new API key
              from{' '}
              <Link
                href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                target="_blank"
                rel="noreferrer"
              >
                here
              </Link>
              . <br />
              Since this is only demo-purpose, be sure you set your access
              token's life cycle to the shortest possible time, and revoke it
              after the demo.
            </div>
          </DialogContent>
          <FormControl>
            <Input
              placeholder="Github API key"
              fullWidth
              slotProps={{
                input: {
                  ref: inputRef,
                },
              }}
              defaultValue={githubApiKey}
            />
          </FormControl>
          <Button type="button" onClick={handleSaveGithubApiKeyClicked}>
            Save
          </Button>
        </ModalDialog>
      </Modal>
    </div>
  );
};
