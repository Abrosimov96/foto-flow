import { useMemo } from "react"

import { EditProfile, RequireAuth } from "@/components"
import { LocaleType } from "@/locales/en"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { TabContent, TabType, Tabs } from "@teamlead.incubator/ui-kit"

import s from "./edit.module.scss"

const tabsData = (t: LocaleType): TabType[] => [
  { title: `${t.editProfile.tabs.generalInformation}`, value: "generalInformation" },
  { title: `${t.editProfile.tabs.devices}`, value: "devices" },
  { title: `${t.editProfile.tabs.accountManagement}`, value: "accountManagement" },
  { title: `${t.editProfile.tabs.myPayments}`, value: "myPayments" }
]

const Edit = () => {
  const { t } = useTranslation()

  const tabs = useMemo(() => tabsData(t), [t])

  return (
    <Tabs className={s.editUserTabs} defaultValue={"generalInformation"} tabs={tabs}>
      <TabContent value={"generalInformation"}>
        <EditProfile />
      </TabContent>
      <TabContent value={"devices"}>
        <div>Devices</div>
      </TabContent>
      <TabContent value={"accountManagement"}>
        <div>Account Management</div>
      </TabContent>
      <TabContent value={"myPayments"}>
        <div>My payments</div>
      </TabContent>
    </Tabs>
  )
}

const EditProtected = () => {
  return (
    <RequireAuth>
      <Edit />
    </RequireAuth>
  )
}

export default EditProtected
