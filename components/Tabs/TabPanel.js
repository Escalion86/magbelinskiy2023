import { TabPanel as MuiTabPanel } from '@mui/lab'
import cn from 'classnames'

const TabPanel = ({ tabName, className, children }) => (
  <MuiTabPanel value={tabName} className="overflow-y-auto p-0">
    <div className={cn('py-2', className)}>{children}</div>
  </MuiTabPanel>
)

export default TabPanel
