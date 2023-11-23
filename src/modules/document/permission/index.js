import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar } from 'antd';
import React from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { FolderOpenOutlined } from '@ant-design/icons';
import { AppConstants, DATE_FORMAT_VALUE, DEFAULT_FORMAT, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import useTranslate from '@hooks/useTranslate';
import { defineMessages } from 'react-intl';
import AvatarField from '@components/common/form/AvatarField';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { PiFolderNotch } from 'react-icons/pi';
import { FormattedMessage } from 'react-intl';
import { convertUtcToLocalTime } from '@utils';
import { convertDateTimeToString, convertStringToDateTime } from '@utils/dayHelper';
import { BsShieldLock } from 'react-icons/bs';
import { BaseTooltip } from '@components/common/form/BaseTooltip';

const message = defineMessages({
    objectName: 'category',
});

const DocumentPermissionListPage = ({ pageOptions }) => {
    const translate = useTranslate();

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.category,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(message.objectName),
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.content,
                        total: response.data.totalElements,
                    };
                }
            };

            const prepareGetListParams = funcs.prepareGetListParams;
            funcs.prepareGetListParams = (params) => {
                return {
                    ...prepareGetListParams(params),
                };
            };
            funcs.handleDeleteItemError = (error) => {
                if (error) {
                    showErrorMessage('Danh mục đang được sử dụng, Không xóa được');
                }
            };
        },
    });

    const columns = [
        {
            title: '#',
            align: 'center',
            width: 80,
            render: () => (
                <div>
                    <PiFolderNotch size={25} />
                </div>
            ),
        },
        { title: translate.formatMessage(commonMessage.fileName), dataIndex: 'name' },
        {
            title: translate.formatMessage(commonMessage.modifiedDate),
            dataIndex: 'modifiedDate',
            render: (modifiedDate) => {
                const result = convertStringToDateTime(modifiedDate, DEFAULT_FORMAT, DEFAULT_FORMAT).add(7, 'hour');
                const modifiedDateString = convertDateTimeToString(result, DEFAULT_FORMAT);
                return <div style={{ padding: '0 4px', fontSize: 14 }}>{modifiedDateString}</div>;
            },
        },
        {
            title: translate.formatMessage(commonMessage.createdDate),
            dataIndex: 'createdDate',
            render: (createdDate) => {
                const result = convertStringToDateTime(createdDate, DEFAULT_FORMAT, DEFAULT_FORMAT).add(7, 'hour');
                const modifiedDateString = convertDateTimeToString(result, DEFAULT_FORMAT);
                return <div style={{ padding: '0 4px', fontSize: 14 }}>{modifiedDateString}</div>;
            },
        },
        {
            title: translate.formatMessage(commonMessage.documentPermission),
            align: 'center',
            width: 80,
            render: () => (
                <BaseTooltip title={translate.formatMessage(commonMessage.viewDocumentPermission)}>
                    <div style={{ cursor: 'pointer' }}>
                        <BsShieldLock color="#1677ff" />
                    </div>
                </BaseTooltip>
            ),
        },
        mixinFuncs.renderStatusColumn({ width: '90px' }, { width: '150px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '150px' }),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.name),
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(commonMessage, translate)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default DocumentPermissionListPage;
