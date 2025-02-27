import CloseIcon from '@mui/icons-material/Close'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import { CoreSessionData } from '@seleniumhq/side-api'
import TextField from 'browser/components/UncontrolledTextField'
import React, { FC } from 'react'
import EditorToolbar from '../../../../components/Drawer/EditorToolbar'

export interface ProjectSettingsProps {
  project: CoreSessionData['project']
}

export interface MiniProjectShape {
  id: string
  name: string
}

const {
  plugins: { projectCreate, projectDelete, projectEdit },
  projects: { update },
} = window.sideAPI
const ProjectSettings: FC<ProjectSettingsProps> = ({
  project,
}) => (
  <>
    <Stack className="p-4" spacing={1}>
      <FormControl>
        <TextField
          id="name"
          label="Name"
          name="name"
          onChange={(e: any) => {
            update({
              name: e.target.value,
            })
          }}
          size="small"
          value={project.name}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="timeout"
          label="Step Timeout (MILLISECONDS)"
          helperText="Steps will fail if they take longer than this setting"
          name="timeout"
          type="number"
          inputProps={{ min:0, step: 1000 }}
          onChange={(e: any) => {
            update({
              delay: Math.max(parseInt(e.target.value || '0'), 0),
            })
          }}
          size="small"
          value={project.delay || 0}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="delay"
          label="Step Delay (MILLISECONDS)"
          helperText="Each step will pause by this setting"
          name="delay"
          type="number"
          inputProps={{ min:0, step: 1000 }}
          onChange={(e: any) => {
            update({
              delay: Math.max(parseInt(e.target.value || '0'), 0),
            })
          }}
          size="small"
          value={project.delay || 0}
        />
      </FormControl>
    </Stack>
    <List
      dense
      subheader={
        <EditorToolbar
          onAdd={() => projectCreate()}
          addText='Add Plugin'
        >
          Project Plugins
        </EditorToolbar>
      }
      sx={{
        borderColor: 'primary.main',
      }}
    >
      {project.plugins.map((plugin, index) => (
        <ListItem className="py-3" key={index}>
          <TextField
            value={typeof plugin === 'string' ? plugin : ''}
            id={`plugin-${index}`}
            fullWidth
            onBlur={(e) => projectEdit(index, e.target.value)}
            size="small"
          />
          <IconButton className="ms-4" onClick={() => projectDelete(index)}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  </>
)

export default ProjectSettings
