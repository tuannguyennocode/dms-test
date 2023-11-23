import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import DocumentPermissionListPage from './permission';
import DocumentPermissionSavePage from './permission/DocumentPermissionSavePage';
const paths = {
    documentPermissionListPage: '/document-permission',
    documentPermissionSavePage: '/document-permission/:id',
};
export default {
    documentPermissionListPage: {
        path: paths.documentPermissionListPage,
        auth: true,
        component: DocumentPermissionListPage,
        // permission: [apiConfig.permission.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.documentPermission,
            renderBreadcrumbs: (messages, translate, title, options = {}) => {
                return [{ breadcrumbName: translate.formatMessage(messages.documentPermission) }];
            },
        },
    },
    documentPermissionSavePage: {
        path: paths.documentPermissionSavePage,
        component: DocumentPermissionSavePage,
        separateCheck: true,
        auth: true,
        // permission: [apiConfig.documentPermission.create.baseURL, apiConfig.documentPermission.update.baseURL],
        pageOptions: {
            objectName: commonMessage.folder,
            listPageUrl: paths.documentPermissionListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    {
                        breadcrumbName: t.formatMessage(commonMessage.documentPermission),
                        path: paths.documentPermissionListPage,
                    },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
