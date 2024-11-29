import "@mantine/core";
import { Avatar, Menu, Group, Button, Modal, Badge } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconShoppingBag,
  IconSearch,
  IconLogout,
  IconSettings,
  IconBox,
  IconTruckDelivery,
  IconCirclePlus,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./navbar.css";
import { useDisclosure } from "@mantine/hooks";
import CreateProduct from "../Product/CreateProduct";
export default function Navbar({
  setUserProducts,
  setHomeProducts,
  query,
  setQuery,
  itemNum,
}) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="navbar">
      <img
        src="../../public/Logo.svg"
        alt="site Logo"
        className="logo clickable"
        onClick={() => {
          navigate("");
        }}
      />
      {(location.pathname == `/login` || location.pathname == `/signup`) && (
        <>
          <h3>Please enter your Credentials </h3>
          <p></p>
        </>
      )}
      {location.pathname !== `/login` && location.pathname !== `/signup` && (
        <div id="navbar-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search"
            type="search"
            placeholder="Search for a product..."
          />
        </div>
      )}
      {isLoggedIn && (
        <>
          <Group>
            <>
              <Modal opened={opened} onClose={close} title="Create Product">
                <CreateProduct
                  close={close}
                  setUserProducts={setUserProducts}
                  setHomeProducts={setHomeProducts}
                />
              </Modal>

              <IconCirclePlus
                stroke={1}
                size={30}
                color="#2c2c2c"
                onClick={open}
                className="clickable plus"
              />
            </>
            <div className="shopping-cart-container">
              <IconShoppingBag
                size={30}
                stroke={1}
                color="#2c2c2c"
                className="clickable"
                onClick={() => navigate(`/user/shopping-cart/${user._id}`)}
              />
              <Badge
                className="shopping-cart-badge"
                color="red"
                size="sm"
                variant="filled"
              >
                {itemNum}
              </Badge>
            </div>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  alt={user.name}
                  src={null || user.image}
                  className="clickable"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{user.name}</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconBox
                      style={{ width: rem(14), height: rem(14) }}
                      alt="shopping cart"
                    />
                  }
                  onClick={() => {
                    navigate(`/user/products/${user._id}`);
                  }}
                >
                  My Products
                </Menu.Item>
                <Menu.Item
                  onClick={() => navigate("/user/orders")}
                  leftSection={
                    <IconTruckDelivery
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  My orders
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Account Setting
                </Menu.Item>

                <Menu.Item
                  onClick={() => {
                    logOutUser();
                    navigate("/");
                  }}
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </>
      )}

      {!isLoggedIn &&
        location.pathname !== `/login` &&
        location.pathname !== `/signup` && (
          <Group>
            <Link to="/login">
              <Button mr={20}>Login</Button>{" "}
            </Link>
          </Group>
        )}
    </nav>
  );
}
